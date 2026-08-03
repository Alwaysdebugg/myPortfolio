-- Trace knowledge store: source-aware hybrid retrieval.
-- Run in Supabase Dashboard -> SQL Editor, then call the protected sync endpoint.

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS knowledge_base_vectors (
  id BIGSERIAL PRIMARY KEY,
  doc_id INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'identity',
  keywords TEXT[] NOT NULL DEFAULT '{}',
  source_label TEXT NOT NULL DEFAULT 'Portfolio',
  source_url TEXT NOT NULL DEFAULT '/',
  last_verified DATE NOT NULL DEFAULT CURRENT_DATE,
  confidence TEXT NOT NULL DEFAULT 'profile',
  embedding_model TEXT NOT NULL DEFAULT 'gemini-embedding-2',
  knowledge_version TEXT NOT NULL DEFAULT '2026-08-02',
  embedding VECTOR(768) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Safe migration path for the original four-column table.
ALTER TABLE knowledge_base_vectors ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'identity';
ALTER TABLE knowledge_base_vectors ADD COLUMN IF NOT EXISTS keywords TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE knowledge_base_vectors ADD COLUMN IF NOT EXISTS source_label TEXT NOT NULL DEFAULT 'Portfolio';
ALTER TABLE knowledge_base_vectors ADD COLUMN IF NOT EXISTS source_url TEXT NOT NULL DEFAULT '/';
ALTER TABLE knowledge_base_vectors ADD COLUMN IF NOT EXISTS last_verified DATE NOT NULL DEFAULT CURRENT_DATE;
ALTER TABLE knowledge_base_vectors ADD COLUMN IF NOT EXISTS confidence TEXT NOT NULL DEFAULT 'profile';
-- Existing rows were created with the previous embedding model. They stay excluded
-- until the protected sync endpoint replaces them with compatible embeddings.
ALTER TABLE knowledge_base_vectors ADD COLUMN IF NOT EXISTS embedding_model TEXT NOT NULL DEFAULT 'gemini-embedding-001';
ALTER TABLE knowledge_base_vectors ADD COLUMN IF NOT EXISTS knowledge_version TEXT NOT NULL DEFAULT 'legacy';
ALTER TABLE knowledge_base_vectors ADD COLUMN IF NOT EXISTS fts TSVECTOR
  GENERATED ALWAYS AS (
    TO_TSVECTOR('english', COALESCE(title, '') || ' ' || COALESCE(content, ''))
  ) STORED;

CREATE INDEX IF NOT EXISTS knowledge_base_vectors_fts_idx
  ON knowledge_base_vectors USING GIN (fts);

CREATE INDEX IF NOT EXISTS knowledge_base_vectors_embedding_hnsw_idx
  ON knowledge_base_vectors USING HNSW (embedding vector_cosine_ops);

CREATE OR REPLACE FUNCTION match_documents(
  query_embedding VECTOR(768),
  match_threshold FLOAT DEFAULT 0.35,
  match_count INT DEFAULT 6,
  query_model TEXT DEFAULT 'gemini-embedding-2'
)
RETURNS TABLE (
  doc_id INTEGER,
  title TEXT,
  content TEXT,
  similarity FLOAT
)
LANGUAGE SQL
STABLE
AS $$
  SELECT
    kb.doc_id,
    kb.title,
    kb.content,
    1 - (kb.embedding <=> query_embedding) AS similarity
  FROM knowledge_base_vectors kb
  WHERE kb.embedding_model = query_model
    AND 1 - (kb.embedding <=> query_embedding) > match_threshold
  ORDER BY kb.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Reciprocal Rank Fusion combines Postgres full-text and semantic ranks.
CREATE OR REPLACE FUNCTION hybrid_search(
  query_text TEXT,
  query_embedding VECTOR(768),
  match_count INT DEFAULT 6,
  full_text_weight FLOAT DEFAULT 1,
  semantic_weight FLOAT DEFAULT 1,
  rrf_k INT DEFAULT 50,
  query_model TEXT DEFAULT 'gemini-embedding-2'
)
RETURNS TABLE (
  doc_id INTEGER,
  score FLOAT
)
LANGUAGE SQL
STABLE
AS $$
  WITH full_text AS (
    SELECT
      kb.doc_id,
      ROW_NUMBER() OVER (
        ORDER BY TS_RANK_CD(kb.fts, WEBSEARCH_TO_TSQUERY('english', query_text)) DESC
      ) AS rank_ix
    FROM knowledge_base_vectors kb
    WHERE kb.embedding_model = query_model
      AND kb.fts @@ WEBSEARCH_TO_TSQUERY('english', query_text)
    ORDER BY rank_ix
    LIMIT LEAST(match_count * 2, 50)
  ),
  semantic AS (
    SELECT
      kb.doc_id,
      ROW_NUMBER() OVER (ORDER BY kb.embedding <=> query_embedding) AS rank_ix
    FROM knowledge_base_vectors kb
    WHERE kb.embedding_model = query_model
    ORDER BY rank_ix
    LIMIT LEAST(match_count * 2, 50)
  )
  SELECT
    COALESCE(full_text.doc_id, semantic.doc_id) AS doc_id,
    COALESCE(1.0 / (rrf_k + full_text.rank_ix), 0.0) * full_text_weight +
    COALESCE(1.0 / (rrf_k + semantic.rank_ix), 0.0) * semantic_weight AS score
  FROM full_text
  FULL OUTER JOIN semantic USING (doc_id)
  ORDER BY score DESC
  LIMIT match_count;
$$;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_knowledge_base_vectors_updated_at ON knowledge_base_vectors;
CREATE TRIGGER update_knowledge_base_vectors_updated_at
  BEFORE UPDATE ON knowledge_base_vectors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE knowledge_base_vectors IS 'Dated, source-aware records used by Trace';
COMMENT ON FUNCTION hybrid_search IS 'Full-text + vector retrieval combined with reciprocal rank fusion';

-- Server routes use SUPABASE_SERVICE_ROLE_KEY. Do not expose that key in the browser.
ALTER TABLE knowledge_base_vectors ENABLE ROW LEVEL SECURITY;

-- Supabase Vector 数据库初始化脚本
-- 在 Supabase Dashboard -> SQL Editor 中执行此脚本

-- 1. 启用 pgvector 扩展（如果尚未启用）
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. 创建知识库向量表
CREATE TABLE IF NOT EXISTS knowledge_base_vectors (
  id BIGSERIAL PRIMARY KEY,
  doc_id INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536) NOT NULL, -- text-embedding-3-small 的维度是 1536
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. 创建索引以加速向量搜索
-- 使用 ivfflat 索引（适合大规模数据，lists 参数根据数据量调整）
CREATE INDEX IF NOT EXISTS knowledge_base_vectors_embedding_idx 
ON knowledge_base_vectors 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- 4. 创建向量搜索函数
-- 使用余弦相似度进行搜索
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  doc_id integer,
  title text,
  content text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    knowledge_base_vectors.doc_id,
    knowledge_base_vectors.title,
    knowledge_base_vectors.content,
    1 - (knowledge_base_vectors.embedding <=> query_embedding) as similarity
  FROM knowledge_base_vectors
  WHERE 1 - (knowledge_base_vectors.embedding <=> query_embedding) > match_threshold
  ORDER BY knowledge_base_vectors.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 5. 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_knowledge_base_vectors_updated_at
  BEFORE UPDATE ON knowledge_base_vectors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 6. 添加注释说明
COMMENT ON TABLE knowledge_base_vectors IS '知识库文档向量存储表';
COMMENT ON COLUMN knowledge_base_vectors.doc_id IS '原始文档 ID';
COMMENT ON COLUMN knowledge_base_vectors.embedding IS '文档的向量表示（1536 维）';
COMMENT ON FUNCTION match_documents IS '向量相似度搜索函数，使用余弦相似度';

-- 7. 设置 Row Level Security (RLS) - 根据需要调整
-- 如果使用 Service Role Key，可以跳过 RLS
-- 如果需要用户级别的访问控制，可以启用 RLS：
-- ALTER TABLE knowledge_base_vectors ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow service role full access" ON knowledge_base_vectors
--   FOR ALL USING (auth.role() = 'service_role');

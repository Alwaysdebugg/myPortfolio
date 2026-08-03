import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import knowledgeBase from "@/data/knowledge-base.json";
import {
  EMBEDDING_MODEL,
  getEmbedding,
  getEmbeddings,
} from "./embeddings";
import type { Doc, SearchResult } from "./types";

const TABLE_NAME = "knowledge_base_vectors";
const KNOWLEDGE_VERSION = "2026-08-02";
const docs = knowledgeBase as Doc[];
const docsById = new Map(docs.map((doc) => [doc.id, doc]));

let client: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase vector search is not configured");
  }

  client ??= createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

function documentText(doc: Doc): string {
  return [
    doc.title,
    doc.category,
    doc.keywords.join(", "),
    doc.content,
    `Source: ${doc.sourceLabel}`,
    `Last verified: ${doc.lastVerified}`,
  ].join("\n");
}

type RpcRow = {
  doc_id: number;
  similarity?: number;
  score?: number;
};

function mapRows(rows: RpcRow[], retrieval: "hybrid" | "vector"): SearchResult[] {
  return rows.flatMap((row) => {
    const doc = docsById.get(Number(row.doc_id));
    if (!doc) return [];

    const similarity = Number(row.similarity ?? row.score ?? 0);
    return [{ doc, score: similarity, similarity, retrieval: [retrieval] }];
  });
}

export async function syncSupabaseStore(): Promise<number> {
  const supabase = getSupabase();
  const embeddings = await getEmbeddings(docs.map(documentText));
  const records = docs.map((doc, index) => ({
    doc_id: doc.id,
    title: doc.title,
    content: doc.content,
    category: doc.category,
    keywords: doc.keywords,
    source_label: doc.sourceLabel,
    source_url: doc.sourceUrl,
    last_verified: doc.lastVerified,
    confidence: doc.confidence,
    embedding_model: EMBEDDING_MODEL,
    knowledge_version: KNOWLEDGE_VERSION,
    embedding: embeddings[index],
  }));

  const { error } = await supabase
    .from(TABLE_NAME)
    .upsert(records, { onConflict: "doc_id" });

  if (error) throw new Error(`Vector-store sync failed: ${error.message}`);
  return records.length;
}

export const initializeSupabaseStore = syncSupabaseStore;

export async function searchSupabase(
  query: string,
  topK = 6,
  matchThreshold = 0.35
): Promise<SearchResult[]> {
  const supabase = getSupabase();
  const queryEmbedding = await getEmbedding(query);

  const hybrid = await supabase.rpc("hybrid_search", {
    query_text: query,
    query_embedding: queryEmbedding,
    match_count: topK,
    full_text_weight: 1,
    semantic_weight: 1,
    rrf_k: 50,
    query_model: EMBEDDING_MODEL,
  });

  if (!hybrid.error && Array.isArray(hybrid.data)) {
    return mapRows(hybrid.data as RpcRow[], "hybrid");
  }

  const vector = await supabase.rpc("match_documents", {
    query_embedding: queryEmbedding,
    match_threshold: matchThreshold,
    match_count: topK,
    query_model: EMBEDDING_MODEL,
  });

  if (vector.error) {
    const hybridDetail = hybrid.error?.message
      ? ` Hybrid search: ${hybrid.error.message}.`
      : "";
    throw new Error(`Vector search: ${vector.error.message}.${hybridDetail}`);
  }

  return mapRows((vector.data ?? []) as RpcRow[], "vector");
}

export async function updateSupabaseDoc(doc: Doc): Promise<void> {
  const embedding = await getEmbeddings([documentText(doc)]);
  const { error } = await getSupabase()
    .from(TABLE_NAME)
    .upsert(
      {
        doc_id: doc.id,
        title: doc.title,
        content: doc.content,
        category: doc.category,
        keywords: doc.keywords,
        source_label: doc.sourceLabel,
        source_url: doc.sourceUrl,
        last_verified: doc.lastVerified,
        confidence: doc.confidence,
        embedding_model: EMBEDDING_MODEL,
        knowledge_version: KNOWLEDGE_VERSION,
        embedding: embedding[0],
      },
      { onConflict: "doc_id" }
    );

  if (error) throw new Error(`Document update failed: ${error.message}`);
}

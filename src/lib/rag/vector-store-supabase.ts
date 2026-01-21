// Supabase Vector 存储实现
import { createClient } from "@supabase/supabase-js";
import { getEmbedding, getEmbeddings } from "./embeddings";
import knowledgeBase from "@/data/knowledge-base.json";
import { Doc } from "./types";

// 初始化 Supabase 客户端
const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

const TABLE_NAME = "knowledge_base_vectors";
const VECTOR_DIMENSION = 1536; // text-embedding-3-small 的维度

/**
 * 初始化 Supabase 向量存储
 * 将知识库文档转换为向量并存储到 Supabase
 */
export async function initializeSupabaseStore(): Promise<void> {
  try {
    // 检查是否已有数据
    const { count, error: countError } = await supabase
      .from(TABLE_NAME)
      .select("*", { count: "exact", head: true });

    if (countError) {
      throw new Error(`Failed to check existing data: ${countError.message}`);
    }

    if (count && count > 0) {
      console.log(`Supabase already has ${count} records. Skipping initialization.`);
      return;
    }

    console.log("Initializing Supabase vector store...");

    // 准备文档文本
    const documents = knowledgeBase.map(
      (doc: Doc) => `${doc.title} ${doc.content}`
    );

    // 批量生成 embeddings
    console.log(`Generating embeddings for ${documents.length} documents...`);
    const embeddings = await getEmbeddings(documents);

    // 准备插入数据
    const records = knowledgeBase.map((doc: Doc, index: number) => ({
      doc_id: doc.id,
      title: doc.title,
      content: doc.content,
      embedding: embeddings[index],
    }));

    // 批量插入（Supabase 支持批量插入）
    const { error } = await supabase.from(TABLE_NAME).insert(records);

    if (error) {
      throw new Error(`Failed to insert data: ${error.message}`);
    }

    console.log(
      `Successfully initialized Supabase with ${records.length} documents`
    );
  } catch (error) {
    console.error("Failed to initialize Supabase store:", error);
    throw error;
  }
}

/**
 * 向量检索 - 在 Supabase 中搜索相似文档
 * @param query 查询文本
 * @param topK 返回前 K 个结果
 * @param matchThreshold 相似度阈值（0-1），默认 0.5
 * @returns 相关文档数组
 */
export async function searchSupabase(
  query: string,
  topK: number = 2,
  matchThreshold: number = 0.5
): Promise<Doc[]> {
  try {
    // 获取查询的 embedding
    const queryEmbedding = await getEmbedding(query);

    // 调用 Supabase 的向量搜索函数
    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: queryEmbedding,
      match_threshold: matchThreshold,
      match_count: topK,
    });

    if (error) {
      throw new Error(`Vector search error: ${error.message}`);
    }

    if (!data || !Array.isArray(data)) {
      console.warn("No results from vector search");
      return [];
    }

    // 转换为 Doc 格式
    const docs: Doc[] = data.map((item: any) => ({
      id: item.doc_id,
      title: item.title,
      content: item.content,
    }));

    console.log(
      "Supabase vector search results:",
      data.map((item: any) => ({
        id: item.doc_id,
        title: item.title,
        similarity: item.similarity?.toFixed(4),
      }))
    );

    return docs;
  } catch (error) {
    console.error("Supabase search error:", error);
    throw error;
  }
}

/**
 * 更新单个文档的向量
 * @param doc 文档对象
 */
export async function updateSupabaseDoc(doc: Doc): Promise<void> {
  try {
    const embedding = await getEmbedding(`${doc.title} ${doc.content}`);

    const { error } = await supabase
      .from(TABLE_NAME)
      .update({
        title: doc.title,
        content: doc.content,
        embedding: embedding,
      })
      .eq("doc_id", doc.id);

    if (error) {
      throw new Error(`Failed to update document: ${error.message}`);
    }
  } catch (error) {
    console.error("Failed to update Supabase doc:", error);
    throw error;
  }
}

/**
 * 删除文档
 * @param docId 文档 ID
 */
export async function deleteSupabaseDoc(docId: number): Promise<void> {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq("doc_id", docId);

    if (error) {
      throw new Error(`Failed to delete document: ${error.message}`);
    }
  } catch (error) {
    console.error("Failed to delete Supabase doc:", error);
    throw error;
  }
}

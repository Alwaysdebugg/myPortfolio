// RAG 检索逻辑
import knowledgeBase from "@/data/knowledge-base.json";

interface Doc {
  id: number;
  title: string;
  content: string;
}

// 检索相关文档（基于关键词匹配）
export function retrieveRelevantDocs(query: string, topK: number = 2): Doc[] {
  const queryWords = query.toLowerCase().split(/\s+/);

  const scoredDocs = knowledgeBase.map((doc: Doc) => {
    const docText = `${doc.title} ${doc.content}`.toLowerCase();
    const score = queryWords.reduce((sum, word) => {
      return sum + (docText.includes(word) ? 1 : 0);
    }, 0);
    return { doc, score };
  });

  return scoredDocs
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter((item) => item.score > 0)
    .map((item) => item.doc);
}

// 构建 prompt
export function buildPrompt(
  relevantDocs: Doc[],
  history: Array<{ role: string; content: string }>,
  currentMessage: string
): string {
  // 构建知识库上下文
  const context = relevantDocs
    .map((doc) => `[${doc.title}]\n${doc.content}`)
    .join("\n\n");

  // 构建对话历史（最近 5 轮）
  const recentHistory = history.slice(-5);
  const historyText = recentHistory
    .map((msg) => `${msg.role === "user" ? "用户" : "助手"}: ${msg.content}`)
    .join("\n");

  return `Answer the question based on the following personal knowledge base. Respond in the first person. If there is no relevant information in the knowledge base, reply with "That's a secret."

Personal Knowledge Base:
${context || "(No relevant information found)"}

Conversation History:
${historyText || "(No previous conversation)"}

Current Question: ${currentMessage}

Please answer the question based on the above information:`;
}

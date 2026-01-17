// RAG 检索逻辑
import knowledgeBase from "@/data/knowledge-base.json";
import { extractWords, wordExistsInText } from "@/utils/text";

interface Doc {
  id: number;
  title: string;
  content: string;
}

// Prompt 配置
const promptConfig = {
  // 系统指令
  instructions: {
    base: "Answer based only on the knowledge base below.",
    responseStyle:
      "Reply as 'I'. If greeted with hi or hello, respond: 'Hello! Nice to meet you!'",
    fallback:
      "If not found in the knowledge base, respond: 'Sorry, I can't answer that.'",
  },
  // 部分模板
  sections: {
    knowledgeBase: "Personal Knowledge Base:",
    conversationHistory: "Conversation History:",
    currentQuestion: "Current Question:",
    closing: "Please answer the question based on the above information:",
  },
  // 占位符文本
  placeholders: {
    noContext: "(No relevant information found)",
    noHistory: "(No previous conversation)",
  },
  // 历史记录配置
  history: {
    maxMessages: 5,
  },
} as const;

// 检索相关文档（基于关键词匹配）
export function retrieveRelevantDocs(query: string, topK: number = 2): Doc[] {
  // 使用改进的分词和归一化
  const queryWords = extractWords(query);

  // 如果没有提取到有效词，返回空数组
  if (queryWords.length === 0) {
    return [];
  }

  const scoredDocs = knowledgeBase.map((doc: Doc) => {
    const docText = `${doc.title} ${doc.content}`.toLowerCase();
    // 也提取文档中的词（用于更精确的匹配）
    const docWords = extractWords(docText);

    // 计算匹配分数：使用单词边界匹配
    const score = queryWords.reduce((sum, word) => {
      // 优先使用单词边界匹配
      if (wordExistsInText(word, docText)) {
        return sum + 1;
      }

      // 如果直接匹配失败，尝试在归一化的文档词中查找
      // 这可以捕获一些词形变化
      if (docWords.some((docWord) => docWord === word || word === docWord)) {
        return sum + 0.8; // 给予稍低的分数
      }

      return sum;
    }, 0);

    // 额外加分：如果查询词在文档中出现频率高
    const bonusScore =
      queryWords.filter((word) => docWords.includes(word)).length * 0.2;

    return { doc, score: score + bonusScore };
  });

  console.log({ scoredDocs });

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

  // 构建对话历史（最近 N 轮）
  const recentHistory = history.slice(-promptConfig.history.maxMessages);
  const historyText = recentHistory
    .map(
      (msg) => `${msg.role === "user" ? "user" : "assistant"}: ${msg.content}`
    )
    .join("\n");

  return `${promptConfig.instructions.base}

    ${promptConfig.instructions.responseStyle}
    
    ${promptConfig.instructions.fallback}
    
    ${promptConfig.sections.knowledgeBase}
    ${context || promptConfig.placeholders.noContext}
    
    ${promptConfig.sections.conversationHistory}
    ${historyText || promptConfig.placeholders.noHistory}
    
    ${promptConfig.sections.currentQuestion} ${currentMessage}
    
    ${promptConfig.sections.closing}`;
}

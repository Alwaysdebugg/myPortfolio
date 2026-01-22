// Google Gemini Embedding 服务
// 使用 gemini-embedding-001 模型

/**
 * 获取单个文本的 embedding 向量
 * @param text 要嵌入的文本
 * @returns embedding 向量数组（768 维）
 */
export async function getEmbedding(text: string): Promise<number[]> {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "models/embedding-001",
          content: {
            parts: [{ text }],
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: response.statusText }));
      throw new Error(`Gemini API error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();

    if (!data.embedding || !data.embedding.values) {
      throw new Error("Invalid response from Gemini API");
    }

    return data.embedding.values;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
}

/**
 * 批量获取多个文本的 embeddings
 * @param texts 文本数组
 * @returns embedding 向量数组的数组
 */
export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    // Gemini API 需要逐个请求，因为 embedContent 不支持批量
    const embeddings = await Promise.all(
      texts.map(async (text) => {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "models/embedding-001",
              content: {
                parts: [{ text }],
              },
            }),
          }
        );

        if (!response.ok) {
          const error = await response
            .json()
            .catch(() => ({ error: response.statusText }));
          throw new Error(`Gemini API error: ${JSON.stringify(error)}`);
        }

        const data = await response.json();

        if (!data.embedding || !data.embedding.values) {
          throw new Error("Invalid response from Gemini API");
        }

        return data.embedding.values;
      })
    );

    return embeddings;
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
}

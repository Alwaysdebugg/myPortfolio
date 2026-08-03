import { google, type GoogleEmbeddingModelOptions } from "@ai-sdk/google";
import { embed, embedMany } from "ai";

export const EMBEDDING_DIMENSION = 768;
export const EMBEDDING_MODEL = "gemini-embedding-2";

const embeddingModel = google.embedding(EMBEDDING_MODEL);

const providerOptions = (taskType: GoogleEmbeddingModelOptions["taskType"]) => ({
  google: {
    outputDimensionality: EMBEDDING_DIMENSION,
    taskType,
  } satisfies GoogleEmbeddingModelOptions,
});

export async function getEmbedding(text: string): Promise<number[]> {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
  }

  const result = await embed({
    model: embeddingModel,
    value: text,
    providerOptions: providerOptions("RETRIEVAL_QUERY"),
  });

  return result.embedding;
}

export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
  }

  const result = await embedMany({
    model: embeddingModel,
    values: texts,
    maxParallelCalls: 2,
    providerOptions: providerOptions("RETRIEVAL_DOCUMENT"),
  });

  return result.embeddings;
}

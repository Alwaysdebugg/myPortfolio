import { google, GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextRequest } from "next/server";
import { retrieveRelevantDocs, buildPrompt } from "@/lib/rag/retrieval";

export const runtime = "edge"; // 或 'nodejs'

const model = google("gemini-2.5-flash");
export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();
    // console.log({ message, history });

    // 1. RAG 检索相关文档
    const relevantDocs = retrieveRelevantDocs(message, 2);
    console.log({ relevantDocs });
    // 2. 构建 prompt（包含知识库上下文和对话历史）
    const prompt = buildPrompt(relevantDocs, history, message);

    // 3. 调用 Gemini API（流式）
    const result = streamText({
      model: model,
      prompt,
      providerOptions: {
        google: {
          thinkingConfig: {
            thinkingBudget: 8192,
            includeThoughts: false,
          },
        } satisfies GoogleGenerativeAIProviderOptions,
      },
    });

    // 4. 返回流式响应
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          // 流式传输文本
          for await (const chunk of result.textStream) {
            const data = `data: ${JSON.stringify({ text: chunk })}\n\n`;
            controller.enqueue(encoder.encode(data));
          }

          // 获取完整结果
          const fullResult = await result;

          // 发送完成标记
          const doneData = `data: ${JSON.stringify({
            done: true,
            reasoning: fullResult.reasoning,
          })}\n\n`;
          controller.enqueue(encoder.encode(doneData));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    // console.log({ stream });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

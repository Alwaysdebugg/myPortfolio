import { google, GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextRequest } from "next/server";
import { retrieveRelevantDocs, buildPrompt } from "@/lib/rag/retrieval";
import { checkRateLimit, getClientIP } from "@/utils/rate";

export const runtime = "nodejs";

const model = google("gemini-2.5-flash");
export async function POST(req: NextRequest) {
  try {
    // 速率限制检查
    const clientIP = getClientIP(req);
    const rateLimitResult = checkRateLimit(clientIP);
    console.log({ rateLimitResult });
    if (!rateLimitResult.allowed) {
      const resetDate = new Date(rateLimitResult.resetAt);
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded",
          message: `Oops, you have hit the limit. Please try again at ${resetDate.toLocaleTimeString(
            "en-US"
          )}.`,
          resetAt: rateLimitResult.resetAt,
        }),
        {
          status: 429, // Too Many Requests
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": "10",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.resetAt.toString(),
            "Retry-After": Math.ceil(
              (rateLimitResult.resetAt - Date.now()) / 1000
            ).toString(),
          },
        }
      );
    }
    const { message, history } = await req.json();
    // console.log({ message, history });

    // 1. RAG 检索相关文档（使用向量检索）
    const relevantDocs = await retrieveRelevantDocs(message, 3, true);
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
        "X-RateLimit-Limit": "10",
        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        "X-RateLimit-Reset": rateLimitResult.resetAt.toString(),
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

import {
  google,
  type GoogleGenerativeAIProviderOptions,
} from "@ai-sdk/google";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  type InferUIMessageChunk,
  streamText,
  toUIMessageStream,
} from "ai";
import { NextRequest } from "next/server";
import {
  buildKnowledgeContext,
  buildTraceSources,
  getSystemPrompt,
  retrieveRelevantDocs,
} from "@/lib/rag/retrieval";
import type { TraceChatMessage } from "@/types/chat";
import { checkRateLimit, getClientIP } from "@/utils/rate";

export const runtime = "nodejs";

const PRIMARY_MODEL = "openai/gpt-5.6-terra";
const FALLBACK_MODELS = [
  "anthropic/claude-sonnet-5",
  "google/gemini-3.6-flash",
];

function textFromMessage(message: TraceChatMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .trim();
}

function gatewayIsConfigured(): boolean {
  return Boolean(
    process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN
  );
}

export async function POST(req: NextRequest) {
  const clientIP = getClientIP(req);
  const rateLimit = checkRateLimit(clientIP);

  if (!rateLimit.allowed) {
    const retryAfter = Math.max(
      1,
      Math.ceil((rateLimit.resetAt - Date.now()) / 1000)
    );
    return Response.json(
      {
        error: "Rate limit exceeded",
        message: "Trace has reached the conversation limit. Please try again shortly.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": "10",
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      }
    );
  }

  try {
    const body = (await req.json()) as { messages?: TraceChatMessage[] };
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const lastUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user");
    const question = lastUserMessage ? textFromMessage(lastUserMessage) : "";

    if (!question) {
      return Response.json({ error: "A question is required." }, { status: 400 });
    }

    const retrievalResults = await retrieveRelevantDocs(question, 5);
    const sources = buildTraceSources(retrievalResults);
    const context = buildKnowledgeContext(retrievalResults);
    const useGateway = gatewayIsConfigured();

    if (!useGateway && !process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return Response.json(
        { error: "Trace's model provider is not configured." },
        { status: 503 }
      );
    }

    const recentMessages = messages.slice(-10);
    const modelMessages = await convertToModelMessages(recentMessages, {
      convertDataPart: () => undefined,
    });

    const result = streamText({
      model: useGateway ? PRIMARY_MODEL : google("gemini-3.5-flash"),
      system: getSystemPrompt(context),
      messages: modelMessages,
      maxOutputTokens: 1_200,
      temperature: 0.2,
      providerOptions: useGateway
        ? {
            gateway: {
              models: FALLBACK_MODELS,
              disallowPromptTraining: true,
              serviceTier: "priority",
            },
          }
        : {
            google: {
              thinkingConfig: {
                thinkingLevel: "minimal",
                includeThoughts: false,
              },
            } satisfies GoogleGenerativeAIProviderOptions,
          },
    });
    const responseStartedAt = new Date().toISOString();

    const stream = createUIMessageStream<TraceChatMessage>({
      originalMessages: messages,
      execute: ({ writer }) => {
        writer.write({ type: "data-sources", data: sources });
        const modelStream = toUIMessageStream({
          stream: result.stream,
          originalMessages: messages,
          sendReasoning: false,
          sendSources: false,
          messageMetadata: () => ({
            route: useGateway ? "gateway" : "direct-google",
            createdAt: responseStartedAt,
          }),
        }) as ReadableStream<InferUIMessageChunk<TraceChatMessage>>;
        writer.merge(modelStream);
      },
      onError: (error) => {
        console.error("Trace stream failed", error);
        return "Trace could not finish that answer. Please try again.";
      },
    });

    return createUIMessageStreamResponse({
      stream,
      headers: {
        "X-RateLimit-Limit": "10",
        "X-RateLimit-Remaining": String(rateLimit.remaining),
        "X-RateLimit-Reset": String(rateLimit.resetAt),
      },
    });
  } catch (error) {
    console.error("Trace request failed", error);
    return Response.json(
      {
        error: "Trace could not answer that question right now.",
      },
      { status: 500 }
    );
  }
}

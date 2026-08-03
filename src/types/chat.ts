import type { UIMessage } from "ai";
import type { TraceSource } from "@/lib/rag/types";

export type TraceMessageMetadata = {
  route?: "gateway" | "direct-google";
  createdAt?: string;
};

export type TraceDataParts = {
  sources: TraceSource[];
};

export type TraceChatMessage = UIMessage<
  TraceMessageMetadata,
  TraceDataParts
>;

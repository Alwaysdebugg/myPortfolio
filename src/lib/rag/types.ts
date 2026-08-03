// 类型定义

export type KnowledgeCategory =
  | "identity"
  | "experience"
  | "project"
  | "education"
  | "capability"
  | "working-style"
  | "personal"
  | "site";

export type KnowledgeConfidence = "verified" | "profile" | "historical";

export interface Doc {
  id: number;
  title: string;
  content: string;
  category: KnowledgeCategory;
  keywords: string[];
  sourceLabel: string;
  sourceUrl: string;
  lastVerified: string;
  confidence: KnowledgeConfidence;
}

export interface SearchResult {
  doc: Doc;
  score: number;
  similarity?: number;
  retrieval: Array<"lexical" | "hybrid" | "vector">;
}

export interface TraceSource {
  id: string;
  title: string;
  label: string;
  url: string;
  lastVerified: string;
  confidence: KnowledgeConfidence;
}

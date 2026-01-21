// 类型定义

export interface Doc {
  id: number;
  title: string;
  content: string;
}

export interface SearchResult {
  doc: Doc;
  score: number;
  similarity?: number;
}

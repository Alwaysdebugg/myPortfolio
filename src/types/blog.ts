export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readingTime: number; // in minutes
  coverImage?: string;
  isPublished: boolean;
}

export interface BlogListProps {
  posts: BlogPost[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onPostClick?: (post: BlogPost) => void;
}

export interface BlogDetailProps {
  post: BlogPost;
  onBack?: () => void;
}

export interface BlogCardProps {
  post: BlogPost;
  onClick?: (post: BlogPost) => void;
}
import { BlogPost } from '@/types/blog'
import { fallbackBlogPosts } from '@/data/blog-posts'

// 为了避免构建时的fs模块问题，我们在静态导出模式下
// 直接使用fallback数据，不进行文件系统操作

/**
 * 计算阅读时间（基于字数，平均每分钟200字）
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * 获取所有博客文章
 * 在静态导出模式下直接返回fallback数据
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  console.log('Using fallback blog posts for static export')
  return fallbackBlogPosts
}

/**
 * 根据slug获取单篇博客文章
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  console.log('Looking for post in fallback data')
  return fallbackBlogPosts.find(post => post.slug === slug) || null
}

/**
 * 获取所有已发布的文章
 */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter(post => post.isPublished)
}

/**
 * 获取所有标签
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllBlogPosts()
  const allTags = new Set<string>()
  
  posts.forEach(post => {
    post.tags.forEach(tag => allTags.add(tag))
  })
  
  return Array.from(allTags).sort()
}

/**
 * 根据标签获取文章
 */
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getPublishedBlogPosts()
  return allPosts.filter(post => post.tags.includes(tag))
}

/**
 * 搜索文章
 */
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const allPosts = await getPublishedBlogPosts()
  const searchTerm = query.toLowerCase()
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}

/**
 * 获取相关文章（基于标签相似性）
 */
export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getPublishedBlogPosts()
  
  // 过滤掉当前文章
  const otherPosts = allPosts.filter(post => post.id !== currentPost.id)
  
  // 计算标签相似度
  const postsWithScore = otherPosts.map(post => {
    const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag))
    return {
      post,
      score: commonTags.length
    }
  })
  
  // 按相似度排序并返回指定数量
  return postsWithScore
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)
}
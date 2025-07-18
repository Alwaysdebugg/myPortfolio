import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { BlogPost } from '@/types/blog'

// 内容目录路径
const CONTENT_DIR = path.join(process.cwd(), 'content/blog')
const GENERATED_DATA_PATH = path.join(process.cwd(), 'src/data/generated-posts.json')

/**
 * 计算阅读时间（基于字数，平均每分钟200字）
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * 解析单个 Markdown 文件
 */
export async function parseMarkdownFile(filePath: string): Promise<BlogPost | null> {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    // 处理 Markdown 内容
    const processedContent = await remark()
      .use(remarkHtml)
      .process(content)
    
    // 从文件名生成 slug（如果没有在 frontmatter 中指定）
    const fileName = path.basename(filePath, '.md')
    const slug = data.slug || fileName
    
    // 计算阅读时间（如果没有在 frontmatter 中指定）
    const readingTime = data.readingTime || calculateReadingTime(content)
    
    const blogPost: BlogPost = {
      id: slug,
      title: data.title || 'Untitled',
      slug,
      excerpt: data.excerpt || '',
      content: content, // 保留原始 Markdown 内容
      author: data.author || 'Unknown',
      publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
      updatedAt: data.updatedAt,
      tags: data.tags || [],
      readingTime,
      coverImage: data.coverImage,
      isPublished: data.isPublished !== false // 默认为发布状态
    }
    
    return blogPost
  } catch (error) {
    console.error(`Error parsing markdown file ${filePath}:`, error)
    return null
  }
}

/**
 * 获取所有 Markdown 文件并解析
 */
export async function getAllMarkdownPosts(): Promise<BlogPost[]> {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      console.warn(`Content directory not found: ${CONTENT_DIR}`)
      return []
    }
    
    const files = fs.readdirSync(CONTENT_DIR)
    const markdownFiles = files.filter(file => file.endsWith('.md'))
    
    const posts: BlogPost[] = []
    
    for (const file of markdownFiles) {
      const filePath = path.join(CONTENT_DIR, file)
      const post = await parseMarkdownFile(filePath)
      if (post) {
        posts.push(post)
      }
    }
    
    // 按发布日期排序
    return posts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  } catch (error) {
    console.error('Error reading markdown files:', error)
    return []
  }
}

/**
 * 生成静态博客数据（用于构建时）
 */
export async function generateStaticBlogData(): Promise<void> {
  try {
    const posts = await getAllMarkdownPosts()
    
    // 确保目录存在
    const dataDir = path.dirname(GENERATED_DATA_PATH)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    // 写入生成的数据
    fs.writeFileSync(GENERATED_DATA_PATH, JSON.stringify(posts, null, 2))
    
    console.log(`Generated ${posts.length} blog posts to ${GENERATED_DATA_PATH}`)
  } catch (error) {
    console.error('Error generating static blog data:', error)
    throw error
  }
}

/**
 * 从生成的静态数据中读取博客文章
 */
export function getGeneratedBlogPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(GENERATED_DATA_PATH)) {
      console.warn(`Generated data file not found: ${GENERATED_DATA_PATH}`)
      return []
    }
    
    const data = fs.readFileSync(GENERATED_DATA_PATH, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading generated blog data:', error)
    return []
  }
}

/**
 * 根据 slug 获取单篇博客文章
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getGeneratedBlogPosts()
  return posts.find(post => post.slug === slug) || null
}

/**
 * 获取所有已发布的文章
 */
export function getPublishedBlogPosts(): BlogPost[] {
  const posts = getGeneratedBlogPosts()
  return posts.filter(post => post.isPublished)
}

/**
 * 获取所有标签
 */
export function getAllTags(): string[] {
  const posts = getGeneratedBlogPosts()
  const allTags = new Set<string>()
  
  posts.forEach(post => {
    post.tags.forEach(tag => allTags.add(tag))
  })
  
  return Array.from(allTags).sort()
}

/**
 * 根据标签获取文章
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  const posts = getPublishedBlogPosts()
  return posts.filter(post => post.tags.includes(tag))
}

/**
 * 搜索文章
 */
export function searchBlogPosts(query: string): BlogPost[] {
  const posts = getPublishedBlogPosts()
  const searchTerm = query.toLowerCase()
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}

/**
 * 获取相关文章（基于标签相似性）
 */
export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const posts = getPublishedBlogPosts()
  
  // 过滤掉当前文章
  const otherPosts = posts.filter(post => post.id !== currentPost.id)
  
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
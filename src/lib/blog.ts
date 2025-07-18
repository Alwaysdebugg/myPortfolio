import { BlogPost } from '@/types/blog'
import { fallbackBlogPosts } from '@/data/blog-posts'

// 在静态导出模式下，我们不能在客户端使用 fs 模块
// 所以直接返回 fallback 数据
let fs: any, path: any, matter: any

// 检查是否在服务器端环境
const isServer = typeof window === 'undefined'

if (isServer) {
  try {
    fs = require('fs')
    path = require('path')
    matter = require('gray-matter')
  } catch (error) {
    console.warn('Failed to load server-side modules:', error)
  }
}

// Blog内容目录路径
const BLOG_DIRECTORY = isServer && path ? path.join(process.cwd(), 'content/blogs') : null

// 获取正确的blog目录路径
function getBlogDirectory(): string {
  const possiblePaths = [
    path.join(process.cwd(), 'content/blogs'),
    path.join(process.cwd(), 'public/content/blogs'),
    path.join(process.cwd(), 'src/content/blogs'),
    '/Users/jackyfeng/Desktop/github-project/myPortfolio/content/blogs'
  ]
  
  for (const blogPath of possiblePaths) {
    if (fs.existsSync(blogPath)) {
      console.log('Found blog directory at:', blogPath)
      return blogPath
    }
  }
  
  console.log('No blog directory found, using default:', BLOG_DIRECTORY)
  return BLOG_DIRECTORY
}

/**
 * 解析Markdown文件的frontmatter
 */
function parseFrontmatter(fileContent: string) {
  const { data, content } = matter(fileContent)
  return {
    metadata: data,
    content: content.trim()
  }
}

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
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // 在客户端或者没有 fs 模块时，直接返回 fallback 数据
  if (!isServer || !fs || !path || !matter) {
    console.log('Using fallback blog posts (client-side or no fs module)')
    return fallbackBlogPosts
  }

  try {
    const blogDirectory = getBlogDirectory()
    console.log('Using blog directory:', blogDirectory)
    
    // 检查目录是否存在
    if (!fs.existsSync(blogDirectory)) {
      console.warn('Blog directory does not exist:', blogDirectory)
      return fallbackBlogPosts
    }

    const files = fs.readdirSync(blogDirectory)
    console.log('Found files:', files)
    
    const markdownFiles = files.filter((file: string) => file.endsWith('.md'))
    console.log('Markdown files:', markdownFiles)

    if (markdownFiles.length === 0) {
      console.warn('No markdown files found in blog directory')
      return fallbackBlogPosts
    }

    const posts = markdownFiles.map((filename: string) => {
      try {
        const filePath = path.join(blogDirectory, filename)
        console.log('Reading file:', filePath)
        
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const { metadata, content } = parseFrontmatter(fileContent)

        // 确保必需字段存在
        const slug = metadata.slug || filename.replace('.md', '')
        const readingTime = metadata.readingTime || calculateReadingTime(content)

        const post = {
          id: slug,
          title: metadata.title || 'Untitled',
          slug,
          excerpt: metadata.excerpt || content.substring(0, 200).replace(/[#*`]/g, '').trim() + '...',
          content,
          author: metadata.author || 'Anonymous',
          publishedAt: metadata.publishedAt || new Date().toISOString(),
          updatedAt: metadata.updatedAt,
          tags: Array.isArray(metadata.tags) ? metadata.tags : [],
          readingTime,
          coverImage: metadata.coverImage,
          isPublished: metadata.isPublished !== false // 默认为已发布
        } as BlogPost

        console.log('Parsed post:', post.title, 'Published:', post.isPublished)
        return post
      } catch (fileError) {
        console.error(`Error reading file ${filename}:`, fileError)
        return null
      }
    }).filter(Boolean) as BlogPost[]

    console.log('Total posts parsed:', posts.length)

    // 按发布日期排序
    return posts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  } catch (error) {
    console.error('Error reading blog posts:', error)
    console.log('Using fallback blog posts data')
    return fallbackBlogPosts
  }
}

/**
 * 根据slug获取单篇博客文章
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const blogDirectory = getBlogDirectory()
    const filePath = path.join(blogDirectory, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { metadata, content } = parseFrontmatter(fileContent)

    const readingTime = metadata.readingTime || calculateReadingTime(content)

    return {
      id: slug,
      title: metadata.title || 'Untitled',
      slug,
      excerpt: metadata.excerpt || '',
      content,
      author: metadata.author || 'Anonymous',
      publishedAt: metadata.publishedAt || new Date().toISOString(),
      updatedAt: metadata.updatedAt,
      tags: Array.isArray(metadata.tags) ? metadata.tags : [],
      readingTime,
      coverImage: metadata.coverImage,
      isPublished: metadata.isPublished !== false
    } as BlogPost
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    console.log('Looking for post in fallback data')
    return fallbackBlogPosts.find(post => post.slug === slug) || null
  }
}

/**
 * 获取所有已发布的文章
 */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllBlogPosts()
    return allPosts.filter(post => post.isPublished)
  } catch (error) {
    console.error('Error getting published posts:', error)
    return fallbackBlogPosts.filter(post => post.isPublished)
  }
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
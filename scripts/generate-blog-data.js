#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// 配置
const CONTENT_DIR = path.join(process.cwd(), 'content/blog')
const OUTPUT_DIR = path.join(process.cwd(), 'src/data')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'generated-posts.json')

/**
 * 计算阅读时间（基于字数，平均每分钟200字）
 */
function calculateReadingTime(content) {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * 解析单个 Markdown 文件
 */
async function parseMarkdownFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    // 从文件名生成 slug（如果没有在 frontmatter 中指定）
    const fileName = path.basename(filePath, '.md')
    const slug = data.slug || fileName
    
    // 计算阅读时间（如果没有在 frontmatter 中指定）
    const readingTime = data.readingTime || calculateReadingTime(content)
    
    const blogPost = {
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
async function getAllMarkdownPosts() {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      console.warn(`Content directory not found: ${CONTENT_DIR}`)
      return []
    }
    
    const files = fs.readdirSync(CONTENT_DIR)
    const markdownFiles = files.filter(file => file.endsWith('.md'))
    
    console.log(`Found ${markdownFiles.length} markdown files`)
    
    const posts = []
    
    for (const file of markdownFiles) {
      const filePath = path.join(CONTENT_DIR, file)
      console.log(`Processing: ${file}`)
      const post = await parseMarkdownFile(filePath)
      if (post) {
        posts.push(post)
        console.log(`✓ Parsed: ${post.title}`)
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
 * 生成静态博客数据
 */
async function generateStaticBlogData() {
  try {
    console.log('🚀 Starting blog data generation...')
    
    const posts = await getAllMarkdownPosts()
    
    // 确保输出目录存在
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true })
      console.log(`Created output directory: ${OUTPUT_DIR}`)
    }
    
    // 写入生成的数据
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2))
    
    console.log(`✅ Successfully generated ${posts.length} blog posts`)
    console.log(`📁 Output file: ${OUTPUT_FILE}`)
    
    // 显示统计信息
    const publishedPosts = posts.filter(post => post.isPublished)
    const draftPosts = posts.filter(post => !post.isPublished)
    
    console.log(`📊 Statistics:`)
    console.log(`   - Published posts: ${publishedPosts.length}`)
    console.log(`   - Draft posts: ${draftPosts.length}`)
    console.log(`   - Total posts: ${posts.length}`)
    
    // 显示所有标签
    const allTags = new Set()
    posts.forEach(post => {
      post.tags.forEach(tag => allTags.add(tag))
    })
    console.log(`   - Unique tags: ${allTags.size}`)
    if (allTags.size > 0) {
      console.log(`   - Tags: ${Array.from(allTags).join(', ')}`)
    }
    
  } catch (error) {
    console.error('❌ Error generating static blog data:', error)
    process.exit(1)
  }
}

// 运行脚本
if (require.main === module) {
  generateStaticBlogData()
}

module.exports = { generateStaticBlogData }
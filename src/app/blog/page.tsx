"use client"

import { useState, useEffect } from 'react'
import BlogList from '@/components/blog/BlogList'
import BlogDetail from '@/components/blog/BlogDetail'
import { BlogPost } from '@/types/blog'

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 获取博客文章数据（静态导出模式下直接导入）
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setError(null)
        console.log('Loading blog posts from file system...')
        
        // 由于是静态导出，直接从文件系统读取
        const { getPublishedBlogPosts } = await import('@/lib/blog')
        const publishedPosts = await getPublishedBlogPosts()
        
        if (publishedPosts && publishedPosts.length > 0) {
          setPosts(publishedPosts)
          console.log('Successfully loaded posts:', publishedPosts.length)
        } else {
          console.warn('No published posts found')
          // 如果文件系统读取失败，使用fallback数据
          const { fallbackBlogPosts } = await import('@/data/blog-posts')
          setPosts(fallbackBlogPosts.filter(post => post.isPublished))
        }
      } catch (error) {
        console.error('Error loading blog posts:', error)
        try {
          // 回退到fallback数据
          const { fallbackBlogPosts } = await import('@/data/blog-posts')
          setPosts(fallbackBlogPosts.filter(post => post.isPublished))
          console.log('Using fallback blog posts')
        } catch (fallbackError) {
          console.error('Failed to load fallback data:', fallbackError)
          setError('无法加载博客文章')
          setPosts([])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post)
  }

  const handleBackToList = () => {
    setSelectedPost(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">加载文章中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold mb-4 text-red-400">加载失败</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    )
  }

  if (selectedPost) {
    return (
      <BlogDetail 
        post={selectedPost} 
        onBack={handleBackToList}
      />
    )
  }

  return (
    <BlogList 
      posts={posts}
      currentPage={currentPage}
      totalPages={1}
      onPageChange={setCurrentPage}
      onPostClick={handlePostClick}
    />
  )
}
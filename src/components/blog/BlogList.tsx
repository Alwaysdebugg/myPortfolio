"use client"

import { motion } from 'framer-motion'
import { FaSearch, FaFilter } from 'react-icons/fa'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { BlogListProps, BlogPost } from '@/types/blog'
import BlogCard from './BlogCard'

export default function BlogList({ posts, currentPage = 1, totalPages = 1, onPageChange, onPostClick }: BlogListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'readingTime'>('date')

  // 获取所有标签
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [posts])

  // 过滤和排序文章
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag = selectedTag === '' || post.tags.includes(selectedTag)
      return matchesSearch && matchesTag && post.isPublished
    })

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        case 'readingTime':
          return a.readingTime - b.readingTime
        default:
          return 0
      }
    })

    return filtered
  }, [posts, searchTerm, selectedTag, sortBy])

  const handlePostClick = (post: BlogPost) => {
    if (onPostClick) {
      onPostClick(post)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 返回首页 */}
        <div>
          <Link href="/" className="text-blue-400 hover:underline mb-4 inline-block">
            Back to Home
          </Link>
        </div>
        {/* 页面标题 */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Technical Blogs</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sharing my journey as a frontend developer.
          </p>
        </motion.header>

        {/* 搜索和过滤 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* 搜索框 */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Searching..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none transition-colors"
            />
          </div>

          {/* 过滤选项 */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400 w-4 h-4" />
              <span className="text-sm text-gray-400">Filter:</span>
            </div>

            {/* 标签过滤 */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-3 py-2 bg-gray-900/50 border border-gray-700/50 rounded text-white text-sm focus:border-blue-400/50 focus:outline-none"
            >
              <option value="">Labels</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            {/* 排序选项 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'readingTime')}
              className="px-3 py-2 bg-gray-900/50 border border-gray-700/50 rounded text-white text-sm focus:border-blue-400/50 focus:outline-none"
            >
              <option value="date">Dates</option>
              <option value="title">Title</option>
              <option value="readingTime">ReadingTime</option>
            </select>

            {/* 结果统计 */}
            <span className="text-sm text-gray-400 ml-auto">
              {filteredAndSortedPosts.length} results found
            </span>
          </div>
        </motion.div>

        {/* 文章网格 */}
        {filteredAndSortedPosts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {filteredAndSortedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <BlogCard post={post} onClick={handlePostClick} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">No content</h3>
            <p className="text-gray-500">No Matches</p>
          </motion.div>
        )}

        {/* 分页 */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-2"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => onPageChange?.(page)}
                className={`px-4 py-2 rounded transition-colors ${
                  page === currentPage
                    ? 'bg-blue-400 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
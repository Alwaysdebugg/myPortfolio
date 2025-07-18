"use client"

import { motion } from 'framer-motion'
import { FaArrowLeft, FaClock, FaCalendar, FaUser, FaTag } from 'react-icons/fa'
import { BlogDetailProps } from '@/types/blog'
import { MarkdownRenderer } from '@/lib/markdown'

export default function BlogDetail({ post, onBack }: BlogDetailProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 返回按钮 */}
        {onBack && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>返回博客列表</span>
          </motion.button>
        )}

        {/* 文章头部 */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* 封面图 */}
          {post.coverImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          )}

          {/* 标题 */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* 文章元信息 */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <FaUser className="text-blue-400" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendar className="text-blue-400" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-blue-400" />
              <span>{post.readingTime} 分钟阅读</span>
            </div>
          </div>

          {/* 标签 */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800/50 border border-gray-600/50 rounded-full text-sm text-blue-400"
                >
                  <FaTag className="w-3 h-3" />
                  {tag}
                </motion.span>
              ))}
            </div>
          )}

          {/* 摘要 */}
          <div className="text-lg text-gray-300 leading-relaxed border-l-4 border-blue-400 pl-6 bg-gray-800/30 rounded-r-lg py-4">
            {post.excerpt}
          </div>
        </motion.header>

        {/* 文章内容 */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg prose-invert max-w-none"
        >
          <MarkdownRenderer 
            content={post.content}
            className="text-gray-300 leading-relaxed"
          />
        </motion.article>

        {/* 文章底部信息 */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-700"
        >
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              {post.updatedAt && (
                <span>最后更新: {formatDate(post.updatedAt)}</span>
              )}
            </div>
            <div className="flex gap-4">
              {/* 这里可以添加分享按钮或其他操作 */}
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}
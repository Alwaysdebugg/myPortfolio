"use client"

import { motion } from 'framer-motion'
import { FaClock, FaCalendar, FaUser, FaArrowRight } from 'react-icons/fa'
import { BlogCardProps } from '@/types/blog'

export default function BlogCard({ post, onClick }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900/50 border border-gray-700/50 rounded-lg overflow-hidden backdrop-blur-sm hover:border-blue-400/50 cursor-pointer group"
      onClick={() => onClick?.(post)}
    >
      {/* 封面图 */}
      {post.coverImage && (
        <div className="relative overflow-hidden h-48">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="p-6">
        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-400/10 text-blue-400 text-xs rounded-full border border-blue-400/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 标题 */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>

        {/* 摘要 */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* 元信息 */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaUser className="w-3 h-3" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaCalendar className="w-3 h-3" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaClock className="w-3 h-3" />
              <span>{post.readingTime}分钟</span>
            </div>
          </div>

          {/* 阅读更多 */}
          <div className="flex items-center gap-1 text-blue-400 group-hover:translate-x-1 transition-transform">
            <span>阅读</span>
            <FaArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.article>
  )
}
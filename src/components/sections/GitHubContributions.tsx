"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaCode, FaStar, FaCodeBranch, FaUsers } from 'react-icons/fa'
import { BiGitPullRequest, BiGitCommit } from 'react-icons/bi'
import { VscIssues } from 'react-icons/vsc'

// 模拟GitHub数据，实际使用时可以通过API获取
const githubStats = {
  username: "Alwaysdebugg",
  repos: 30,
  stars: 25,
  forks: 40,
  followers: 2,
  contributions: 486,
  pullRequests: 32,
  issues: 18,
  streak: 14,
  languages: [
    { name: "JavaScript", percentage: 45, color: "#f1e05a" },
    { name: "TypeScript", percentage: 30, color: "#2b7489" },
    { name: "HTML", percentage: 15, color: "#e34c26" },
    { name: "CSS", percentage: 10, color: "#563d7c" }
  ]
}

// 模拟贡献数据
const contributionData = [
  { day: "Mon", count: 4 },
  { day: "Tue", count: 7 },
  { day: "Wed", count: 2 },
  { day: "Thu", count: 5 },
  { day: "Fri", count: 9 },
  { day: "Sat", count: 3 },
  { day: "Sun", count: 1 }
]

// 获取贡献热力图颜色
function getContributionColor(count: number) {
  if (count === 0) return "bg-gray-200 dark:bg-gray-700"
  if (count < 3) return "bg-green-200 dark:bg-green-900"
  if (count < 6) return "bg-green-300 dark:bg-green-700"
  if (count < 9) return "bg-green-400 dark:bg-green-600"
  return "bg-green-500 dark:bg-green-500"
}

export default function GitHubContributions() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 模拟加载数据
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="contributions" className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4"
      >
        {/* 分隔线 */}
        <div className="relative">
          <div className="border-t-2 border-gray-300 dark:border-gray-700 mt-10 mb-20 w-[80%] mx-auto"></div>
          <div className="absolute inset-x-[10%] top-0 h-3 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm"></div>
          <div className="absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
        </div>

        <div className="flex items-center justify-center mb-12">
          <FaGithub className="w-8 h-8 mr-3 text-gray-800 dark:text-white" />
          <h2 className="text-xl md:text-3xl font-bold text-center font-serif">
            GitHub Contributions
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 左侧：GitHub 统计信息 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-4">
                  <img
                    src={`https://github.com/${githubStats.username}.png`}
                    alt={githubStats.username}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `${
                        process.env.NEXT_PUBLIC_BASE_PATH || ""
                      }/images/github-placeholder.png`;
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {githubStats.username}
                  </h3>
                  <a
                    href={`https://github.com/${githubStats.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center"
                  >
                    <span>View GitHub Profile</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center">
                  <FaCode className="w-5 h-5 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Repositories
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {githubStats.repos}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center">
                  <FaStar className="w-5 h-5 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Stars
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {githubStats.stars}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center">
                  <FaCodeBranch className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Forks
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {githubStats.forks}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center">
                  <FaUsers className="w-5 h-5 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Followers
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {githubStats.followers}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BiGitCommit className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Contributions
                    </span>
                  </div>
                  <span className="font-bold text-gray-800 dark:text-white">
                    {githubStats.contributions}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BiGitPullRequest className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Pull Requests
                    </span>
                  </div>
                  <span className="font-bold text-gray-800 dark:text-white">
                    {githubStats.pullRequests}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <VscIssues className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Issues
                    </span>
                  </div>
                  <span className="font-bold text-gray-800 dark:text-white">
                    {githubStats.issues}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-orange-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">
                      Streak
                    </span>
                  </div>
                  <span className="font-bold text-gray-800 dark:text-white">
                    {githubStats.streak} days
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 右侧：语言统计和贡献热图 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
            >
              <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                Programming Languages
              </h3>
              <div className="space-y-4 mb-8">
                {githubStats.languages.map((lang, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {lang.name}
                      </span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {lang.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full"
                        style={{
                          width: `${lang.percentage}%`,
                          backgroundColor: lang.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                This Week Contributions
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {contributionData.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 ${getContributionColor(
                        day.count
                      )} rounded-md mb-1`}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {day.day}
                    </span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {day.count}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                  Contribution Heatmap
                </h3>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }).map((_, index) => {
                    // 随机生成贡献数量，实际应用中应该使用真实数据
                    const count = Math.floor(Math.random() * 10);
                    return (
                      <div
                        key={index}
                        className={`w-full aspect-square ${getContributionColor(
                          count
                        )} rounded-sm`}
                        title={`${count} Contributions`}
                      ></div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        <div className="mt-8 text-center">
          <motion.a
            href={`https://github.com/${githubStats.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="w-5 h-5 mr-2" />
            <span>Visit My GitHub Profile</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
} 
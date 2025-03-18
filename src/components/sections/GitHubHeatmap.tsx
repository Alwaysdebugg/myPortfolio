"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'

// 生成模拟的一年贡献数据
function generateYearContributions() {
  // 获取当前日期
  const today = new Date()
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(today.getFullYear() - 1)
  
  // 创建一个包含过去一年每天的数组
  const days = []
  const currentDate = new Date(oneYearAgo)
  
  // 生成过去一年的日期
  while (currentDate <= today) {
    days.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  // 为每一天生成随机贡献数
  return days.map(day => {
    // 生成更真实的贡献模式
    const dayOfWeek = day.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    
    // 周末贡献较少
    const baseContribution = isWeekend ? 
      Math.floor(Math.random() * 3) : 
      Math.floor(Math.random() * 8)
    
    // 有时会有高峰期
    const isHighActivity = Math.random() > 0.9
    const contribution = isHighActivity ? 
      baseContribution + Math.floor(Math.random() * 15) : 
      baseContribution
    
    return {
      date: day,
      count: contribution,
      // 添加月份和星期几信息，用于显示
      month: day.getMonth(),
      dayOfWeek: day.getDay()
    }
  })
}

// 获取贡献热力图颜色
function getContributionColor(count: number) {
  if (count === 0) return "bg-gray-200 dark:bg-gray-700"
  if (count < 3) return "bg-green-200 dark:bg-green-900"
  if (count < 6) return "bg-green-300 dark:bg-green-700"
  if (count < 9) return "bg-green-400 dark:bg-green-600"
  return "bg-green-500 dark:bg-green-500"
}

// 格式化日期为 YYYY-MM-DD
function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}

// 月份名称
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function GitHubHeatmap() {
  const [contributions, setContributions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    average: 0,
    max: 0,
    streak: 0
  })

  useEffect(() => {
    // 模拟加载数据
    setTimeout(() => {
      const data = generateYearContributions()
      setContributions(data)
      
      // 计算统计数据
      const total = data.reduce((sum, day) => sum + day.count, 0)
      const max = Math.max(...data.map(day => day.count))
      
      // 计算最长连续贡献天数
      let currentStreak = 0
      let maxStreak = 0
      
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].count > 0) {
          currentStreak++
          maxStreak = Math.max(maxStreak, currentStreak)
        } else {
          break // 一旦遇到没有贡献的日子，当前连续记录就中断了
        }
      }
      
      setStats({
        total,
        average: Math.round((total / data.length) * 10) / 10,
        max,
        streak: maxStreak
      })
      
      setIsLoading(false)
    }, 1000)
  }, [])

  // 将贡献数据按周分组
  const weeks = []
  if (contributions.length > 0) {
    for (let i = 0; i < contributions.length; i += 7) {
      weeks.push(contributions.slice(i, i + 7))
    }
  }

  // 获取显示的月份标签
  const monthLabels = []
  if (contributions.length > 0) {
    let currentMonth = contributions[0].month
    monthLabels.push({ month: currentMonth, index: 0 })
    
    for (let i = 1; i < contributions.length; i++) {
      if (contributions[i].month !== currentMonth) {
        currentMonth = contributions[i].month
        monthLabels.push({ month: currentMonth, index: i })
      }
    }
  }

  return (
    <section id="github-heatmap" className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="flex items-center justify-center mb-8">
          <FaGithub className="w-8 h-8 mr-3 text-gray-800 dark:text-white" />
          <h2 className="text-xl md:text-3xl font-bold text-center font-serif">
            GitHub Activity
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            {/* 贡献统计 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Contributions</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Average Per Day</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.average}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Most in a Day</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.max}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.streak} days</p>
              </div>
            </div>

            {/* 热力图 */}
            <div className="overflow-x-auto">
              <div className="min-w-max">
                {/* 月份标签 */}
                <div className="flex mb-1 pl-10">
                  {monthLabels.map((label, idx) => (
                    <div 
                      key={idx} 
                      className="text-xs text-gray-600 dark:text-gray-400"
                      style={{ 
                        position: 'relative', 
                        left: `${Math.floor(label.index / 7) * 20}px` 
                      }}
                    >
                      {monthNames[label.month]}
                    </div>
                  ))}
                </div>

                <div className="flex">
                  {/* 星期标签 */}
                  <div className="flex flex-col justify-around pr-2">
                    {dayNames.map((day, idx) => (
                      <div key={idx} className="text-xs text-gray-600 dark:text-gray-400 h-5 flex items-center">
                        {idx % 2 === 0 ? day : ''}
                      </div>
                    ))}
                  </div>

                  {/* 贡献格子 */}
                  <div className="grid grid-flow-col gap-1">
                    {weeks.map((week, weekIdx) => (
                      <div key={weekIdx} className="grid grid-rows-7 gap-1">
                        {Array.from({ length: 7 }).map((_, dayIdx) => {
                          const day = week[dayIdx]
                          return (
                            <div 
                              key={dayIdx} 
                              className={`w-5 h-5 ${day ? getContributionColor(day.count) : 'bg-gray-200 dark:bg-gray-700'} rounded-sm`}
                              title={day ? `${formatDate(day.date)}: ${day.count} contributions` : 'No contributions'}
                            ></div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 颜色图例 */}
                <div className="flex justify-end items-center mt-4">
                  <span className="text-xs text-gray-600 dark:text-gray-400 mr-2">Less</span>
                  <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-200 dark:bg-green-900 rounded-sm ml-1"></div>
                  <div className="w-3 h-3 bg-green-300 dark:bg-green-700 rounded-sm ml-1"></div>
                  <div className="w-3 h-3 bg-green-400 dark:bg-green-600 rounded-sm ml-1"></div>
                  <div className="w-3 h-3 bg-green-500 dark:bg-green-500 rounded-sm ml-1"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">More</span>
                </div>
              </div>
            </div>

            {/* 活动摘要 */}
            {/* <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Activity Summary</h3>
              <p className="text-gray-700 dark:text-gray-300">
                In the past year, you've made <span className="font-bold">{stats.total}</span> contributions, 
                with an average of <span className="font-bold">{stats.average}</span> per day. 
                Your current streak is <span className="font-bold">{stats.streak}</span> days, 
                and your most active day had <span className="font-bold">{stats.max}</span> contributions.
              </p>
            </div> */}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
} 
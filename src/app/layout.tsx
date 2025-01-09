"use client"

import { Roboto_Mono } from 'next/font/google'
import "./globals.css"
import { useEffect } from "react"

// 配置 Roboto Mono 字体
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 设置默认暗色主题
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <html lang="zh" className={`dark ${robotoMono.variable}`}>
      <body className={robotoMono.className}>
        {children}
      </body>
    </html>
  )
} 
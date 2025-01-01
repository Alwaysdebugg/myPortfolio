"use client"

import { Inter } from "next/font/google"
import "./globals.css"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="zh" className="dark">
      <body className={inter.className}>
        <div className="max-w-6xl mx-auto py-8">
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
} 
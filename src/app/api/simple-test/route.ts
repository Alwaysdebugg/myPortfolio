import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    {
      id: 'test-1',
      title: '测试文章1',
      slug: 'test-1',
      excerpt: '这是一篇测试文章',
      content: '# 测试文章\n\n这是测试内容。',
      author: 'Test Author',
      publishedAt: '2024-01-01',
      tags: ['测试'],
      readingTime: 1,
      isPublished: true
    }
  ])
}
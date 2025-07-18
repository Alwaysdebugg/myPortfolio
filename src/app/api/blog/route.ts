import { NextResponse } from 'next/server'
import { getPublishedBlogPosts } from '@/lib/blog'

export async function GET() {
  try {
    console.log('API: Fetching blog posts from file system...')
    
    const publishedPosts = await getPublishedBlogPosts()
    
    console.log('API: Found posts:', publishedPosts.length)
    
    return NextResponse.json(publishedPosts, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch blog posts',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}


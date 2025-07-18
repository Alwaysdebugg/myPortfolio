import { NextResponse } from 'next/server'
import { getBlogPostBySlug } from '@/lib/blog'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getBlogPostBySlug(params.slug)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error(`Error fetching blog post ${params.slug}:`, error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}


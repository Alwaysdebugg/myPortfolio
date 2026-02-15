import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getPublishedBlogPosts } from '@/lib/blog'
import BlogDetail from '@/components/blog/BlogDetail'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: 'Blog | Not Found' }
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post || !post.isPublished) {
    notFound()
  }

  return <BlogDetail post={post} />
}

import { getPublishedBlogPosts } from '@/lib/blog'
import { fallbackBlogPosts } from '@/data/blog-posts'
import BlogList from '@/components/blog/BlogList'

export const metadata = {
  title: 'Technical Blogs',
  description: 'Sharing my journey as a frontend developer.',
}

export default async function BlogPage() {
  let posts
  try {
    posts = await getPublishedBlogPosts()
    if (!posts || posts.length === 0) {
      posts = fallbackBlogPosts.filter((post) => post.isPublished)
    }
  } catch {
    posts = fallbackBlogPosts.filter((post) => post.isPublished)
  }

  return (
    <BlogList
      posts={posts}
      currentPage={1}
      totalPages={1}
    />
  )
}

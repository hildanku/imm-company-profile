import BlogPostCard  from '@/components/pages/blog'
import { posts } from '@/lib/data'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog')({
    component: BlogPost,
})

function BlogPost() {
    return (
        <BlogPostCard {...posts} />
    )
}

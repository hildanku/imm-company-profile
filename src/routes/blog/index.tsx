import BlogPostCard from '@/components/pages/blog'
import { blogRepository } from '@/lib/repository/blog'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { SEO } from '@/components/custom-ui/seo'
import { Loading } from '@/components/ui/loading'

export const Route = createFileRoute('/blog/')({
    component: BlogPostList,
})

function BlogPostList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['blog-posts'],
        queryFn: () => blogRepository.listMerge(),
    })

    const posts = data ?? []
    console.log("data", data)

    const blogData = {
        tagline: "Latest Posts",
        heading: "Blog",
        description:
            "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
        buttonText: "View all posts",
        buttonUrl: "/blog",
        posts: posts.map((post) => ({
            id: post.id,
            title: post.title,
            summary: post.body.substring(0, 150) + '...',
            label: post.label,
            author: post.author,
            published: new Date(post.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }),
            url: `/blog/${post.slug}`,
            image: post.featured_image?.image_path || '',
        })),
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (isError || posts.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-600">Failed to load posts.</p>
            </div>
        )
    }

    return (
        <>
            <SEO
                title="Blog - Indonesia Mitra Media"
                description="Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights."
                keywords="IMM, Indonesia Mitra Media, blog, articles, web development, design systems"
                ogType="website"
                ogUrl="/blog"
            />
            <BlogPostCard {...blogData} />
        </>
    )
}

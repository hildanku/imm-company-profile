import { createFileRoute, Link } from '@tanstack/react-router'
import { fetchPostBySlug, getImageUrl } from '@/lib/repository/blog'
import { useQuery } from '@tanstack/react-query'
import { HeaderSection } from '@/components/header-section'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { SEO } from '@/components/seo'
import { Loading } from '@/components/ui/loading'

export const Route = createFileRoute('/blog/$slug')({
    component: BlogPostDetail,
})

function BlogPostDetail() {
    const { slug } = Route.useParams()

    const { data: post, isLoading, isError } = useQuery({
        queryKey: ['blog-post', slug],
        queryFn: () => fetchPostBySlug(slug),
        enabled: !!slug,
    })

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (isError || !post) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
                <p className="mb-6">
                    The blog post you're looking for doesn't exist or has been removed.
                </p>
                <Link to="/blog" className="flex items-center text-blue-600 hover:underline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Link>
            </div>
        )
    }

    const formattedDate = new Date(post.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    return (
        <>
            <SEO
                title={`${post.title} - Indonesia Mitra Media Blog`}
                description={post.body.substring(0, 160)}
                keywords={`IMM, Indonesia Mitra Media, ${post.label}, ${post.author}, blog post`}
                ogType="article"
                ogUrl={`/blog/${slug}`}
                ogImage={post.featured_image ? getImageUrl(post.featured_image.image_path) : undefined}
            />
            <HeaderSection
                firstText={post.label || 'Blog Post'}
                secondText={post.title}
                description={`By ${post.author} • ${formattedDate}`}
            />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Link to="/blog" className="flex items-center text-blue-600 hover:underline mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Link>

                {post.featured_image && (
                    <div className="mb-8">
                        <img
                            src={getImageUrl(post.featured_image.image_path)}
                            alt={post.title}
                            className="w-full h-auto rounded-lg object-cover"
                            style={{ maxHeight: '500px' }}
                        />
                    </div>
                )}

                <div className="prose prose-lg dark:prose-invert max-w-none markdown-preview">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    >
                        {post.body}
                    </ReactMarkdown>
                </div>

                {post.images.length > 1 && (
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold mb-4">Gallery</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {post.images.map((image) => (
                                <div key={image.id} className="aspect-square overflow-hidden rounded-lg">
                                    <img
                                        src={getImageUrl(image.image_path)}
                                        alt={`Image ${image.id}`}
                                        className="w-full h-full object-cover transition-transform hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

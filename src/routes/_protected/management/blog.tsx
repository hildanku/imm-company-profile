import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { PostWithImages } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Eye, HelpCircle } from 'lucide-react'
import { blogRepository, getImageUrl } from '@/lib/repository/blog'
import { BlogUpsert } from '@/components/pages/management/blog/upsert'
import { MarkdownCheatsheet } from '@/components/pages/management/blog/markdown-cheatsheet'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const Route = createFileRoute('/_protected/management/blog')({
    component: BlogManagementDashboard,
})

function BlogManagementDashboard() {

    const queryClient = useQueryClient()
    const [selectedPost, setSelectedPost] = useState<PostWithImages | null>(null)

    //const [posts, setPosts] = useState<PostWithImages[]>([])
    // const [loading, setLoading] = useState(true)
    // const [selectedPost, setSelectedPost] = useState<PostWithImages | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [_showCheatsheet, _setShowCheatsheet] = useState(false)


    const { data, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: () => blogRepository.listMerge()
    })

    const posts = data ?? []

    /*
        const loadPosts = async () => {
            try {
                setLoading(true)
                const result = await blogRepository.listMerge()
                console.log('Loaded posts:', result)
                setPosts(result)
            } catch (error) fect(() => {
            loadPosts()
        }, [])
    */
    const handleCreateClick = () => {
        setSelectedPost(null)
        setIsCreating(true)
    }

    const handleEditClick = (post: PostWithImages) => {
        setSelectedPost(post)
        setIsCreating(false)
    }

    const handleFormSuccess = () => {
        setSelectedPost(null)
        setIsCreating(false)
        queryClient.invalidateQueries({ queryKey: ['posts'] })
    }

    const handleBackToList = () => {
        setSelectedPost(null)
        setIsCreating(false)
    }

    if (isCreating || selectedPost) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="mb-6">
                    <Button onClick={handleBackToList} variant="outline">
                        ← Back to Posts
                    </Button>
                </div>
                <BlogUpsert post={selectedPost || undefined} onSuccess={handleFormSuccess} />
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
                <div className="flex space-x-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">
                                <HelpCircle className="mr-2 h-4 w-4" />
                                Markdown Help
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Markdown Cheatsheet</SheetTitle>
                            </SheetHeader>
                            <div className="mt-6">
                                <MarkdownCheatsheet />
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Button onClick={handleCreateClick}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Post
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-8">Loading posts...</div>
            ) : posts.length === 0 ? (
                <div className="text-center py-8">
                    <p className="mb-4">No posts found.</p>
                    <Button onClick={handleCreateClick}>Create Your First Post</Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <Card key={post.id} className="overflow-hidden">
                            {post.featured_image && (
                                <div className="aspect-video w-full overflow-hidden">
                                    <img
                                        src={getImageUrl(post.featured_image.image_path)}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 mb-2">
                                    {new Date(post.created_at).toLocaleDateString()}
                                    {post.is_published ? (
                                        <span className="ml-2 inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                            Published
                                        </span>
                                    ) : (
                                        <span className="ml-2 inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                                            Draft
                                        </span>
                                    )}
                                </p>
                                <p className="line-clamp-3 text-sm mb-4">{post.body.substring(0, 150)}...</p>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEditClick(post)}
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                    >
                                        <a href={`/blog?slug=${post.slug}`} target="_blank" rel="noopener noreferrer">
                                            <Eye className="mr-2 h-4 w-4" />
                                            View
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

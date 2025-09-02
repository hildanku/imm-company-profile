
import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import {
    createPost,
    updatePost,
    deletePost,
    uploadPostImage,
    setFeaturedImage,
    deletePostImage,
    getImageUrl,
} from '@/lib/repository/blog'
import type { Post, PostImage, PostWithImages } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Upload, Star, AlertCircle, Eye, Edit2 } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema } from '@/lib/zod'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import './markdown-styles.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface BlogFormProps {
    post?: PostWithImages
    onSuccess?: () => void
}

type PostFormValues = any

export function BlogUpsert({ post, onSuccess }: BlogFormProps) {
    const [images, setImages] = useState<PostImage[]>([])
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [uploadProgress, setUploadProgress] = useState(0)
    const [previewMode, setPreviewMode] = useState(false)
    const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null)

    const queryClient = useQueryClient()
    const isEditing = !!post

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            body: '',
            slug: '',
            label: '',
            author: '',
            url: '',
            is_published: false,
        },
        mode: 'onBlur',
    })

    const title = watch('title')
    const slug = watch('slug')

    useEffect(() => {
        if (post) {
            reset({
                title: post.title,
                body: post.body,
                slug: post.slug,
                label: post.label || '',
                author: post.author,
                url: post.url || '',
                is_published: post.is_published,
            })
            setImages(post.images || [])
        }
    }, [post, reset])

    useEffect(() => {
        if (title && !isEditing && !slug) {
            const generatedSlug = title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
            setValue('slug', generatedSlug)
        }
    }, [title, isEditing, slug, setValue])

    const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newSlug = e.target.value.toLowerCase().replace(/[^\w-]/g, '').replace(/-+/g, '-')
        setValue('slug', newSlug)
    }

    const upsertMutation = useMutation({
        mutationFn: async (formData: PostFormValues) => {
            if (isEditing && post) {
                return updatePost(post.id, formData)
            }
            return createPost(formData as Omit<Post, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>)
        },
        onSuccess: async (savedPost) => {
            if (!savedPost) {
                toast.error('Failed to save post')
                return
            }

            if (imageFiles.length > 0) {
                let uploadedCount = 0
                for (const file of imageFiles) {
                    const isFeatured = images.length === 0 && uploadedCount === 0
                    await uploadPostImage(savedPost.id, file, isFeatured)
                    uploadedCount++
                    setUploadProgress(Math.round((uploadedCount / imageFiles.length) * 100))
                }
                setImageFiles([])
                setUploadProgress(0)
            }

            toast.success(isEditing ? 'Post updated' : 'Post created')
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            onSuccess?.()
            if (!isEditing) {
                reset()
                setImages([])
            }
        },
        onError: (err: any) => toast.error(err.message || 'Error saving post'),
    })

    const deleteMutation = useMutation({
        mutationFn: async () => {
            if (!post) throw new Error('No post to delete')
            return deletePost(post.id)
        },
        onSuccess: () => {
            toast.success('Post deleted')
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            onSuccess?.()
        },
        onError: (err: any) => toast.error(err.message || 'Error deleting post'),
    })

    const setFeaturedMutation = useMutation({
        mutationFn: (imageId: number) => setFeaturedImage(imageId),
        onSuccess: (_, imageId) => {
            setImages((prev) => prev.map((img) => ({ ...img, is_featured: img.id === imageId })))
            toast.success('Featured image updated')
        },
        onError: () => toast.error('Failed to set featured image'),
    })

    const deleteImageMutation = useMutation({
        mutationFn: (imageId: number) => deletePostImage(imageId),
        onSuccess: (_, imageId) => {
            setImages((prev) => prev.filter((img) => img.id !== imageId))
            toast.success('Image deleted')
        },
        onError: () => toast.error('Failed to delete image'),
    })

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setImageFiles((prev) => [...prev, ...files])
        }
    }

    const handleRemoveImageFile = (index: number) => {
        setImageFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const insertMarkdown = (markdownSyntax: string, selectionOffset = 0) => {
        if (!textareaRef) return
        const start = textareaRef.selectionStart
        const end = textareaRef.selectionEnd
        const selectedText = textareaRef.value.substring(start, end)

        let newText
        let newCursorPos

        if (selectedText) {
            newText =
                textareaRef.value.substring(0, start) +
                markdownSyntax.replace('$1', selectedText) +
                textareaRef.value.substring(end)
            newCursorPos = end + markdownSyntax.length - 2
        } else {
            newText =
                textareaRef.value.substring(0, start) +
                markdownSyntax.replace('$1', '') +
                textareaRef.value.substring(end)
            newCursorPos = start + selectionOffset
        }

        setValue('body', newText)

        setTimeout(() => {
            if (textareaRef) {
                textareaRef.focus()
                textareaRef.setSelectionRange(newCursorPos, newCursorPos)
            }
        }, 0)
    }

    const markdownToolbar = [
        { label: 'B', title: 'Bold', action: () => insertMarkdown('**$1**', 2) },
        { label: 'I', title: 'Italic', action: () => insertMarkdown('*$1*', 1) },
        { label: 'H1', title: 'Heading 1', action: () => insertMarkdown('# $1', 2) },
        { label: 'H2', title: 'Heading 2', action: () => insertMarkdown('## $1', 3) },
        { label: 'Link', title: 'Link', action: () => insertMarkdown('[$1](url)', 1) },
        { label: 'Img', title: 'Image', action: () => insertMarkdown('![$1](url)', 2) },
        { label: 'List', title: 'Bullet List', action: () => insertMarkdown('- $1', 2) },
        { label: '1.', title: 'Numbered List', action: () => insertMarkdown('1. $1', 3) },
        { label: '`', title: 'Code', action: () => insertMarkdown('`$1`', 1) },
        { label: '```', title: 'Code Block', action: () => insertMarkdown('```\n$1\n```', 4) },
        { label: '>', title: 'Quote', action: () => insertMarkdown('> $1', 2) },
        { label: '---', title: 'Horizontal Rule', action: () => insertMarkdown('\n---\n$1', 5) },
    ]

    const onSubmit = (formData: PostFormValues) => {
        upsertMutation.mutate(formData)
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            deleteMutation.mutate()
        }
    }
    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>{isEditing ? 'Edit Post' : 'Create New Post'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {upsertMutation.isError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            {String((upsertMutation.error as any)?.message)}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input id="title" placeholder="Post title" {...register('title')} />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug *</Label>
                        <Input id="slug" {...register('slug')} onChange={handleSlugChange} />
                        {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label>Content *</Label>
                            <div className="flex space-x-2">
                                <Button
                                    type="button"
                                    variant={previewMode ? 'outline' : 'default'}
                                    size="sm"
                                    onClick={() => setPreviewMode(false)}
                                >
                                    <Edit2 className="h-4 w-4 mr-1" /> Edit
                                </Button>
                                <Button
                                    type="button"
                                    variant={previewMode ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setPreviewMode(true)}
                                >
                                    <Eye className="h-4 w-4 mr-1" /> Preview
                                </Button>
                            </div>
                        </div>

                        {!previewMode && (
                            <div className="flex flex-wrap gap-1 mb-2 p-1 border rounded-md bg-gray-50 dark:bg-gray-800">
                                {markdownToolbar.map((item, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        title={item.title}
                                        className="px-2 py-1 text-xs font-medium bg-white dark:bg-gray-700 border rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                                        onClick={item.action}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        <Controller
                            name="body"
                            control={control}
                            render={({ field }) =>
                                previewMode ? (
                                    <div className="w-full min-h-[200px] p-4 border rounded-md bg-white dark:bg-gray-800 overflow-auto markdown-preview">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                                            {field.value}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <textarea
                                        {...field}
                                        ref={(el) => setTextareaRef(el)}
                                        className="w-full min-h-[200px] p-2 border rounded-md font-mono"
                                    />
                                )
                            }
                        />
                        {errors.body && <p className="text-red-500 text-sm">{errors.body.message}</p>}
                    </div>

                    <div className="space-y-4">
                        <Label>Images</Label>
                        {images.map((image) => (
                            <div key={image.id} className="relative group">
                                <img src={getImageUrl(image.image_path)} alt="" className="w-full h-32 object-cover rounded-md" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                                    <button type="button" onClick={() => setFeaturedMutation.mutate(image.id)} className="p-1 bg-yellow-500 rounded-full">
                                        <Star className="h-5 w-5 text-white" />
                                    </button>
                                    <button type="button" onClick={() => deleteImageMutation.mutate(image.id)} className="p-1 bg-red-500 rounded-full">
                                        <X className="h-5 w-5 text-white" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {imageFiles.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                {imageFiles.map((file, index) => (
                                    <div key={index} className="relative group">
                                        <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-32 object-cover rounded-md" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImageFile(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {uploadProgress > 0 && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }} />
                            </div>
                        )}

                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="image-upload"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-3 text-gray-500" />
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG, WEBP (max 5MB)</p>
                                </div>
                                <input id="image-upload" type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        {isEditing && (
                            <Button type="button" onClick={handleDelete} variant="destructive" disabled={deleteMutation.isPending}>
                                {deleteMutation.isPending ? <Spinner /> : 'Delete'}
                            </Button>
                        )}
                        <Button type="submit" disabled={upsertMutation.isPending}>
                            {upsertMutation.isPending && <Spinner className="mr-2" />}
                            {isEditing ? 'Update' : 'Create'} Post
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

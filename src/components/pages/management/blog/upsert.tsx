import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import {
    createPost,
    updatePost,
    deletePost,
    uploadPostImage,
    setFeaturedImage,
    deletePostImage,
    getImageUrl
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

interface BlogFormProps {
    post?: PostWithImages
    onSuccess?: () => void
}

// love any<3
type PostFormValues = any

export function BlogUpsert({ post, onSuccess }: BlogFormProps) {
    const [images, setImages] = useState<PostImage[]>([])
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [uploadProgress, setUploadProgress] = useState(0)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [previewMode, setPreviewMode] = useState(false)
    const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null)

    const isEditing = !!post

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            body: '',
            slug: '',
            label: '',
            author: '',
            url: '',
            is_published: false
        },
        mode: 'onBlur'
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
                is_published: post.is_published
            })
            setImages(post.images || [])
        }
    }, [post, reset])

    useEffect(() => {
        if (title && !isEditing && !slug) {
            const generatedSlug = generateSlug(title)
            setValue('slug', generatedSlug)
        }
    }, [title, isEditing, slug, setValue])

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
    }

    const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newSlug = e.target.value
            .toLowerCase()
            .replace(/[^\w-]/g, '') // Only allow letters, numbers, and hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen

        setValue('slug', newSlug)
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setImageFiles(prev => [...prev, ...files])
        }
    }

    const handleRemoveImageFile = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleRemoveImage = async (imageId: number) => {
        try {
            setIsSubmitting(true)
            const success = await deletePostImage(imageId)
            if (success) {
                setImages(prev => prev.filter(img => img.id !== imageId))
            } else {
                setSubmitError('Failed to delete image')
            }
        } catch (err) {
            setSubmitError('An error occurred while deleting the image')
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleSetFeatured = async (imageId: number) => {
        try {
            setIsSubmitting(true)
            const success = await setFeaturedImage(imageId)
            if (success) {
                setImages(prev =>
                    prev.map(img => ({
                        ...img,
                        is_featured: img.id === imageId
                    }))
                )
            } else {
                setSubmitError('Failed to set featured image')
            }
        } catch (err) {
            setSubmitError('An error occurred while setting the featured image')
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const onSubmit = async (formData: PostFormValues) => {
        setSubmitError(null)
        setIsSubmitting(true)

        try {
            let savedPost: Post | null

            if (isEditing && post) {
                savedPost = await updatePost(post.id, formData)
            } else {
                savedPost = await createPost(formData as Omit<Post, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>)
            }

            if (!savedPost) {
                setSubmitError('Failed to save post')
                setIsSubmitting(false)
                return
            }

            if (imageFiles.length > 0) {
                const totalImages = imageFiles.length
                let uploadedCount = 0

                for (const file of imageFiles) {
                    const isFeatured = images.length === 0 && uploadedCount === 0 // Set first image as featured if no images exist
                    await uploadPostImage(savedPost.id, file, isFeatured)
                    uploadedCount++
                    setUploadProgress(Math.round((uploadedCount / totalImages) * 100))
                }

                setImageFiles([])
                setUploadProgress(0)
            }

            if (onSuccess) {
                onSuccess()
            }

            if (!isEditing) {
                reset()
                setImages([])
            }
        } catch (err) {
            setSubmitError('An error occurred while saving the post')
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!post) return

        if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            try {
                setIsSubmitting(true)
                const success = await deletePost(post.id)

                if (success && onSuccess) {
                    onSuccess()
                } else {
                    setSubmitError('Failed to delete post')
                }
            } catch (err) {
                setSubmitError('An error occurred while deleting the post')
                console.error(err)
            } finally {
                setIsSubmitting(false)
            }
        }
    }

    const insertMarkdown = (markdownSyntax: string, selectionOffset = 0) => {
        if (!textareaRef) return

        const start = textareaRef.selectionStart
        const end = textareaRef.selectionEnd
        const selectedText = textareaRef.value.substring(start, end)

        let newText
        let newCursorPos

        if (selectedText) {
            newText = textareaRef.value.substring(0, start) +
                markdownSyntax.replace('$1', selectedText) +
                textareaRef.value.substring(end)
            newCursorPos = end + markdownSyntax.length - 2 // -2 for the $1 placeholder
        } else {
            newText = textareaRef.value.substring(0, start) +
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

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>{isEditing ? 'Edit Post' : 'Create New Post'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {submitError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            {submitError}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            placeholder="Post title"
                            {...register('title')}
                            className={errors.title ? "border-red-500" : ""}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug *</Label>
                        <Input
                            id="slug"
                            placeholder="post-url-slug"
                            {...register('slug')}
                            onChange={handleSlugChange}
                            className={errors.slug ? "border-red-500" : ""}
                        />
                        {errors.slug ? (
                            <p className="text-red-500 text-sm">{errors.slug.message}</p>
                        ) : (
                            <p className="text-sm text-gray-500">
                                This will be used in the URL: /blog?slug=your-slug
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="label">Label/Category</Label>
                        <Input
                            id="label"
                            placeholder="Technology, News, etc."
                            {...register('label')}
                            className={errors.label ? "border-red-500" : ""}
                        />
                        {errors.label && (
                            <p className="text-red-500 text-sm">{errors.label.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="author">Author *</Label>
                        <Input
                            id="author"
                            placeholder="Author name"
                            {...register('author')}
                            className={errors.author ? "border-red-500" : ""}
                        />
                        {errors.author && (
                            <p className="text-red-500 text-sm">{errors.author.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="url">External URL</Label>
                        <Input
                            id="url"
                            placeholder="https://example.com/article"
                            {...register('url')}
                            className={errors.url ? "border-red-500" : ""}
                        />
                        {errors.url ? (
                            <p className="text-red-500 text-sm">{errors.url.message}</p>
                        ) : (
                            <p className="text-sm text-gray-500">
                                Optional. If provided, clicking on the post will navigate to this URL.
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="body">Content *</Label>
                            <div className="flex space-x-2">
                                <Button
                                    type="button"
                                    variant={previewMode ? "outline" : "default"}
                                    size="sm"
                                    onClick={() => setPreviewMode(false)}
                                >
                                    <Edit2 className="h-4 w-4 mr-1" />
                                    Edit
                                </Button>
                                <Button
                                    type="button"
                                    variant={previewMode ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setPreviewMode(true)}
                                >
                                    <Eye className="h-4 w-4 mr-1" />
                                    Preview
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
                            render={({ field }) => (
                                <>
                                    {previewMode ? (
                                        <div className="w-full min-h-[200px] p-4 border rounded-md bg-white dark:bg-gray-800 overflow-auto markdown-preview">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                                            >
                                                {field.value}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        <textarea
                                            id="body"
                                            placeholder="Post content (supports Markdown)"
                                            className={`w-full min-h-[200px] p-2 border rounded-md font-mono ${errors.body ? "border-red-500" : ""
                                                }`}
                                            {...field}
                                            ref={(el) => setTextareaRef(el)}
                                        />
                                    )}
                                </>
                            )}
                        />
                        {errors.body && (
                            <p className="text-red-500 text-sm">{errors.body.message}</p>
                        )}
                        {!previewMode && (
                            <p className="text-sm text-gray-500">
                                Supports Markdown formatting: **bold**, *italic*, [links](url), ![images](url), # headings, etc.
                            </p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Controller
                            name="is_published"
                            control={control}
                            render={({ field: { onChange, value, ref } }) => (
                                <input
                                    type="checkbox"
                                    id="is_published"
                                    checked={value}
                                    onChange={onChange}
                                    ref={ref}
                                    className="rounded"
                                />
                            )}
                        />
                        <Label htmlFor="is_published">Publish post</Label>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-4">
                        <Label>Images</Label>

                        {/* Existing Images */}
                        {images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                {images.map((image) => (
                                    <div key={image.id} className="relative group">
                                        <img
                                            src={getImageUrl(image.image_path)}
                                            alt="Post image"
                                            className="w-full h-32 object-cover rounded-md"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => handleSetFeatured(image.id)}
                                                className={`p-1 rounded-full ${image.is_featured ? 'bg-yellow-500' : 'bg-gray-200'}`}
                                                title={image.is_featured ? 'Featured Image' : 'Set as Featured'}
                                            >
                                                <Star className="h-5 w-5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(image.id)}
                                                className="p-1 bg-red-500 rounded-full"
                                                title="Remove Image"
                                            >
                                                <X className="h-5 w-5 text-white" />
                                            </button>
                                        </div>
                                        {image.is_featured && (
                                            <div className="absolute top-0 right-0 bg-yellow-500 text-xs px-2 py-1 rounded-bl-md">
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* New Image Files */}
                        {imageFiles.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                {imageFiles.map((file, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="New image"
                                            className="w-full h-32 object-cover rounded-md"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImageFile(index)}
                                                className="p-1 bg-red-500 rounded-full"
                                            >
                                                <X className="h-5 w-5 text-white" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Upload Progress */}
                        {uploadProgress > 0 && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        )}

                        {/* Image Upload Input */}
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
                                    <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 5MB)</p>
                                </div>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        {isEditing && (
                            <Button
                                type="button"
                                onClick={handleDelete}
                                variant="destructive"
                                disabled={isSubmitting}
                            >
                                Delete
                            </Button>
                        )}
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Spinner className="mr-2" /> : null}
                            {isEditing ? 'Update' : 'Create'} Post
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

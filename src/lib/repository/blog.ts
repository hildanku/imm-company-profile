import type { Post, PostImage, PostWithImages } from '@/types'
import supabase from '@/lib/supabase'
import { SUPABASE_OBJECT_URL } from '@/lib/const'
import type { AsyncBaseRepository, CreateArgs, FindByIdArgs, ListArgs, UpdateArgs } from '@/lib/repository/base-repository'

export class BlogRepository implements Omit<AsyncBaseRepository<Post>, 'listMerge'> {
    private tableName = 'posts'

    async create(args: CreateArgs<Post | Record<string, any>>): Promise<Post[]> {
        const { data, error } = await supabase
            .from(this.tableName)
            .insert([args.item])
            .select()

        if (error) {
            console.error('Error creating career:', error)
            return []
        }

        return data || []
    }

    async findById(args: FindByIdArgs): Promise<Post[] | null> {
        const { data, error } = await supabase
            .from(this.tableName)
            .select('*')
            .eq('id', args.id)
            .single()

        if (error || !data) {
            console.error('Error fetching career:', error)
            return null
        }

        return [data]
    }

    async list(args: Partial<ListArgs>): Promise<{ items: Post[]; meta: { totalItems: number } }> {
        const {
            sort = 'created_at',
            order = 'DESC',
            q = '',
            limit = 10,
            page = 1,
            ...filters
        } = args

        // Calculate pagination
        const from = (page - 1) * limit
        const to = from + limit - 1

        // Start building the query
        let query = supabase
            .from(this.tableName)
            .select('*', { count: 'exact' })

        // Apply search if provided
        if (q) {
            query = query.or(`job_title.ilike.%${q}%,job_description.ilike.%${q}%`)
        }

        // Apply additional filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query = query.eq(key, value)
            }
        })

        // Apply sorting and pagination
        const { data, error, count } = await query
            .order(sort, { ascending: order === 'ASC' })
            .range(from, to)

        if (error) {
            console.error('Error fetching careers:', error)
            return { items: [], meta: { totalItems: 0 } }
        }

        return {
            items: data || [],
            meta: {
                totalItems: count || 0
            }
        }
    }

    async update(args: UpdateArgs<Post | Record<string, any>>): Promise<Post[] | null> {
        const { data, error } = await supabase
            .from(this.tableName)
            .update(args.item)
            .eq('id', args.id)
            .select()

        if (error) {
            console.error('Error updating career:', error)
            return null
        }

        return data || null
    }

    async delete(args: any): Promise<boolean> {
        const { error } = await supabase
            .from(this.tableName)
            .delete()
            .eq('id', args.id)

        if (error) {
            console.error('Error deleting career:', error)
            return false
        }

        return true
    }

    async listMerge() {
        const { data: posts, error } = await supabase
            .from(this.tableName)
            .select('*')
            .eq('is_published', true)
            .is('deleted_at', null)
            .order('created_at', { ascending: false })
        if (error) {
            console.error('Error fetching posts:', error)
            return []
        }

        const postsWithImages = await Promise.all(
            posts.map(async (post) => {
                const { data: images } = await supabase
                    .from('post_images')
                    .select('*')
                    .eq('post_id', post.id)
                    .order('display_order', { ascending: true })

                const featuredImage = images?.find(img => img.is_featured) || images?.[0]

                return {
                    ...post,
                    images: images || [],
                    featured_image: featuredImage
                } as PostWithImages
            })
        )
        return postsWithImages
    }
}

export const blogRepository = new BlogRepository()

// LEGACY CODE: This file is used for legacy code and should be refactored in the future.
const SUPABASE_BUCKET = import.meta.env.VITE_SUPABASE_BUCKET || 'assets-imm'

export async function fetchPublishedPosts(): Promise<PostWithImages[]> {
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching posts:', error)
        return []
    }

    const postsWithImages = await Promise.all(
        posts.map(async (post) => {
            const { data: images } = await supabase
                .from('post_images')
                .select('*')
                .eq('post_id', post.id)
                .order('display_order', { ascending: true })

            const featuredImage = images?.find(img => img.is_featured) || images?.[0]

            return {
                ...post,
                images: images || [],
                featured_image: featuredImage
            } as PostWithImages
        })
    )

    return postsWithImages
}

export async function fetchPostBySlug(slug: string): Promise<PostWithImages | null> {
    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .is('deleted_at', null)
        .single()

    if (error || !post) {
        console.error('Error fetching post:', error)
        return null
    }

    const { data: images } = await supabase
        .from('post_images')
        .select('*')
        .eq('post_id', post.id)
        .order('display_order', { ascending: true })

    const featuredImage = images?.find(img => img.is_featured) || images?.[0]

    return {
        ...post,
        images: images || [],
        featured_image: featuredImage
    }
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>): Promise<Post | null> {
    const { data, error } = await supabase
        .from('posts')
        .insert([post])
        .select()
        .single()

    if (error) {
        console.error('Error creating post:', error)
        return null
    }

    return data
}

export async function updatePost(id: number, post: Partial<Post>): Promise<Post | null> {
    const { data, error } = await supabase
        .from('posts')
        .update(post)
        .eq('id', id)
        .select()
        .single()

    if (error) {
        console.error('Error updating post:', error)
        return null
    }

    return data
}

export async function deletePost(id: number): Promise<boolean> {
    const { error } = await supabase
        .from('posts')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id)

    if (error) {
        console.error('Error deleting post:', error)
        return false
    }

    return true
}

export async function uploadPostImage(
    postId: number,
    file: File,
    isFeatured: boolean = false,
    displayOrder: number = 0
): Promise<PostImage | null> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${postId}_${Date.now()}.${fileExt}`
    const filePath = `posts/${fileName}`

    const { error: uploadError } = await supabase
        .storage
        .from(SUPABASE_BUCKET)
        .upload(filePath, file)

    if (uploadError) {
        console.error('Error uploading image:', uploadError)
        return null
    }

    if (isFeatured) {
        await supabase
            .from('post_images')
            .update({ is_featured: false })
            .eq('post_id', postId)
            .eq('is_featured', true)
    }

    const { data, error } = await supabase
        .from('post_images')
        .insert([{
            post_id: postId,
            image_path: filePath,
            display_order: displayOrder,
            is_featured: isFeatured
        }])
        .select()
        .single()

    if (error) {
        console.error('Error creating image record:', error)
        return null
    }

    return data
}

export async function deletePostImage(imageId: number): Promise<boolean> {
    const { data: image, error: fetchError } = await supabase
        .from('post_images')
        .select('*')
        .eq('id', imageId)
        .single()

    if (fetchError || !image) {
        console.error('Error fetching image:', fetchError)
        return false
    }

    const { error: storageError } = await supabase
        .storage
        .from(SUPABASE_BUCKET)
        .remove([image.image_path])

    if (storageError) {
        console.error('Error deleting image from storage:', storageError)
    }

    const { error } = await supabase
        .from('post_images')
        .delete()
        .eq('id', imageId)

    if (error) {
        console.error('Error deleting image record:', error)
        return false
    }

    return true
}


export async function setFeaturedImage(imageId: number): Promise<boolean> {
    const { data: image, error: fetchError } = await supabase
        .from('post_images')
        .select('*')
        .eq('id', imageId)
        .single()

    if (fetchError || !image) {
        console.error('Error fetching image:', fetchError)
        return false
    }

    const { error: updateError } = await supabase
        .from('post_images')
        .update({ is_featured: false })
        .eq('post_id', image.post_id)

    if (updateError) {
        console.error('Error updating images:', updateError)
        return false
    }

    const { error } = await supabase
        .from('post_images')
        .update({ is_featured: true })
        .eq('id', imageId)

    if (error) {
        console.error('Error setting featured image:', error)
        return false
    }

    return true
}


export function getImageUrl(imagePath: string): string {
    return `${SUPABASE_OBJECT_URL}${imagePath}`
}

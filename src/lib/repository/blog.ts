import type { Post, PostImage, PostWithImages } from '@/types'
import supabase from '@/lib/supabase'
import { SUPABASE_OBJECT_URL } from '@/lib/const'

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

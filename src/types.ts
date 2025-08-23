export type Theme = 'light' | 'dark'

export type Language = 'id' | 'en'

export interface LanguageContextType {
    language: Language
    toggleLanguage: () => void
    t: (id: string) => string
}

export interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}

export interface Product {
    id: number
    name: string
    description: string
    image_path: string
    url_product: string
}

export interface BlogPost {
    id: number
    title: string
    summary: string
    label: string
    author: string
    published: string
    url: string
    image: string
}

export interface Career {
    id: string
    title: string
    position: string
    description: string
    type: 'FullTime' | 'PartTime' | 'Freelance' | 'Internship'
    location: string
    work_arrangement: 'Hybrid' | 'Remote' | 'On-Site'
    deadline: string
    status: 'Open' | 'Closed'
    image?: string
}

// in ts 5.8 enum is not supported, if erasablesyntaxonly is enabled
// so my approach is to use string literal
// fixing: https://stackoverflow.com/questions/79441290/eslint-rule-to-warn-on-typescripts-erasablesyntaxonly-flag
// some article: 
// 1. https://www.totaltypescript.com/erasable-syntax-only
// 2. https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html
/* enum JobType {
    fulltime = 'fulltime',
    parttime = 'parttime',
    freelance = 'freelance',
    internship = 'internship',
} */

export interface User {
    id: string
    email: string
    name: string
    role: 'admin' | 'editor' | 'viewer'
    avatar_url?: string
    created_at: string
    updated_at: string
    last_sign_in_at?: string
}

export interface Post {
    id: number
    title: string
    body: string
    slug: string
    label: string
    author: string
    url: string
    is_published: boolean
    created_at: string
    updated_at: string
    deleted_at: string | null
}

export interface PostImage {
    id: number
    post_id: number
    image_path: string
    display_order: number
    is_featured: boolean
    created_at: string
}

export interface PostWithImages extends Post {
    images: PostImage[]
    featured_image?: PostImage
}


export type Theme = 'light' | 'dark'

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

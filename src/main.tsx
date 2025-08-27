import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { ThemeProvider } from '@/contexts/theme-context'
import { LanguageProvider } from '@/contexts/language-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a new router instance
const router = createRouter({ routeTree })

const queryClient = new QueryClient()

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <LanguageProvider>
                        <RouterProvider router={router} />
                    </LanguageProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </StrictMode>,
    )
}

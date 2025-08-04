import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
    component: () => (
        <>
            <Header />
            <Outlet />
            <Separator />
            <Footer />
            <TanStackRouterDevtools />
        </>
    ),
})

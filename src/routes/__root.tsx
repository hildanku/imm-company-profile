import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { HeaderV2 } from '@/components/header-v2'
import { HeaderV2X } from '@/components/header-v2-x'
import { Separator } from '@/components/ui/separator'
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    const routerState = useRouterState()
    const currentPath = routerState.location.pathname
    const isProtectedRoute = currentPath.startsWith('/_protected') ||
        currentPath.includes('/management')

    if (isProtectedRoute) {
        return (
            <>
                <Outlet />
                <TanStackRouterDevtools />
            </>
        )
    }

    return (
        <>
            <HeaderV2X />
            <div className="mt-16">
                <Outlet />
            </div>
            <Separator />
            <Footer />
            <TanStackRouterDevtools />
        </>
    )
}

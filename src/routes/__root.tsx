import { Footer } from '@/components/custom-ui/footer'
import { HeaderV2 } from '@/components/custom-ui/header-v2'
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
            <HeaderV2 />
            <div className="mt-16">
                <Outlet />
            </div>
            <Separator />
            <Footer />
            <TanStackRouterDevtools />
        </>
    )
}

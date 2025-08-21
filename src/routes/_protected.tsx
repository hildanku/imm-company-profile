import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
    component: ProtectedLayout,
})

function ProtectedLayout() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main className="flex flex-col flex-1">
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <div className="flex items-center gap-1">
                            <h1 className="text-lg font-semibold">IMM - Content Management System</h1>
                        </div>
                    </header>
                    <div className="flex-1 p-4">
                        <Outlet />
                    </div>
                </main>
                {/* <TanStackRouterDevtools position="bottom-right"/> */}
            </SidebarProvider>
        </>
    )
}

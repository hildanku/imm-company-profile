import { ProtectedLayout } from '@/components/protected-layout'
import supabase from '@/lib/supabase'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
    beforeLoad: async () => {
        const { data, error } = await supabase.auth.getSession()
        if (data?.session && !error) {
            throw redirect({
                to: '/management/blog',
            })
        }
    },
    component: ProtectedLayout,
})
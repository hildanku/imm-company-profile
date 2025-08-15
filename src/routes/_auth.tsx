import { ProtectedLayout } from '@/components/protected-layout'
import supabase from '@/lib/supabase'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
    component: ProtectedLayout,
    loader: () => {
        if (supabase.auth.getSession === null) {
            throw redirect({
                to: '/',
            })
        }
    },
})
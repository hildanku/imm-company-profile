
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { User } from '@/types'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UserUpsert } from '@/components/pages/management/user/upsert'
import { UserTable, type UserRow } from '@/components/pages/management/user/user-table'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getAllUser, deleteUser } from '@/lib/repository/user'

export const Route = createFileRoute('/_protected/management/user')({
    component: UserManagementDashboard,
})

function UserManagementDashboard() {
    const queryClient = useQueryClient()
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isCreating, setIsCreating] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => getAllUser(),
    })

    const users = data ?? []

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            toast.success('User deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: () => toast.error('Failed to delete user'),
    })

    const handleCreateClick = () => {
        setSelectedUser(null)
        setIsCreating(true)
    }

    const handleEditClick = (user: UserRow) => {
        const found = users.find((u) => u.id === user.id)
        if (found) {
            setSelectedUser(found)
            setIsCreating(true)
        }
    }

    const handleDeleteClick = (user: UserRow) => {
        if (window.confirm(`Are you sure you want to delete ${user.name || user.email}?`)) {
            deleteMutation.mutate(user.id)
        }
    }

    const handleFormSuccess = () => {
        setSelectedUser(null)
        setIsCreating(false)
        queryClient.invalidateQueries({ queryKey: ['users'] })
    }

    const handleBackToList = () => {
        setSelectedUser(null)
        setIsCreating(false)
    }

    const userRows: UserRow[] = users.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        profile_role: u.role,
        avatar_url: u.avatar_url,
        last_sign_in_at: u.last_sign_in_at,
        created_at: u.created_at,
    }))

    if (isCreating || selectedUser) {
        return (
            <div className="container mx-auto py-8 px-4 max-w-6xl">
                <div className="mb-6">
                    <Button onClick={handleBackToList} variant="outline" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Users
                    </Button>
                </div>
                <UserUpsert user={selectedUser || undefined} onSuccess={handleFormSuccess} />
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <UserTable
                users={userRows}
                loading={isLoading}
                onCreate={handleCreateClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
            />
        </div>
    )
}


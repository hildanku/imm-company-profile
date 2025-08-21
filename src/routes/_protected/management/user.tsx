import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { User } from '@/types'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { getAllUser } from '@/lib/repository/user'
import { UserUpsert } from '@/components/pages/management/user/upsert'
import { UserTable, type UserRow } from '@/components/pages/management/user/user-table'

export const Route = createFileRoute('/_protected/management/user')({
    component: UserManagementDashboard,
})

function UserManagementDashboard() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isCreating, setIsCreating] = useState(false)

    const loadUsers = async () => {
        try {
            setLoading(true)
            const fetchedUsers = await getAllUser()
            setUsers(fetchedUsers)
        } catch (error) {
            console.error('Error loading users:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const handleCreateClick = () => {
        setSelectedUser(null)
        setIsCreating(true)
    }

    const handleEditClick = (user: UserRow) => {
        const userToEdit = users.find(u => u.id === user.id)
        if (userToEdit) {
            setSelectedUser(userToEdit)
            setIsCreating(false)
        }
    }

    const handleDeleteUser = async (user: UserRow) => {
        if (window.confirm(`Are you sure you want to delete ${user.name || user.email}?`)) {
            try {
                // Add your delete user API call here
                // await deleteUser(user.id)

                // For now, just remove from local state
                setUsers(users.filter(u => u.id !== user.id))
                console.log('User deleted:', user.id)
            } catch (error) {
                console.error('Error deleting user:', error)
            }
        }
    }

    const handleFormSuccess = () => {
        setSelectedUser(null)
        setIsCreating(false)
        loadUsers()
    }

    const handleBackToList = () => {
        setSelectedUser(null)
        setIsCreating(false)
    }

    const userRows: UserRow[] = users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name || null,
        role: user.role || null,
        profile_role: user.role || null,
        avatar_url: user.avatar_url || null,
        last_sign_in_at: user.last_sign_in_at || null,
        created_at: user.created_at
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
                <UserUpsert
                    user={selectedUser || undefined}
                    onSuccess={handleFormSuccess}
                />
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <UserTable
                users={userRows}
                loading={loading}
                onCreate={handleCreateClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteUser}
            />
        </div>
    )
}

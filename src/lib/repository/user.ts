import type { User } from '@/types'
import supabase from '@/lib/supabase'

// check id for registration user
export async function checkUserId() {
    const { data: users, error } = await supabase
        .from('users')
        .select('id')
        .order('id', { ascending: true })
    if (error) {
        console.error('error fetching user id', error)
        return {}
    }

    return users
}

export async function getAllUser(): Promise<User[]> {
    const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching users:', error)
        return []
    }

    return users || []
}

export async function getUserById(id: string): Promise<User | null> {
    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !user) {
        console.error('Error fetching user:', error)
        return null
    }

    return user
}

export async function createUser(userData: {
    email: string
    password: string
    name: string
    role: 'admin' | 'editor' | 'viewer'
}): Promise<{ user: User | null; error: string | null }> {
    try {

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
                data: {
                    name: userData.name,
                    role: userData.role,
                },
            },
        })
        console.log(authData)
        if (authError) {
            return { user: null, error: authError.message }
        }

        if (authData.user) {
            const user: User = {
                id: authData.user.id,
                email: authData.user.email || '',
                name: userData.name,
                role: userData.role,
                created_at: authData.user.created_at || new Date().toISOString(),
                updated_at: authData.user.updated_at || new Date().toISOString(),
            }
            const create = await supabase.from('users').insert(user)
            if (!create) {
                return { user: null, error: 'Failed to create user' }
            }
            return { user, error: null }
        }

        return { user: null, error: 'Failed to create user' }
    } catch (error) {
        console.error('Error creating user:', error)
        return { user: null, error: 'An unexpected error occurred' }
    }
}

export async function updateUser(
    id: string,
    userData: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
): Promise<{ user: User | null; error: string | null }> {
    try {
        const { data: authData, error: authError } = await supabase.auth.updateUser({
            email: userData.email,
            data: {
                name: userData.name,
                role: userData.role,
            },
        })

        if (authError) {
            return { user: null, error: authError.message }
        }

        if (authData.user) {
            const { data: user } = await supabase
                .from('users')
                .select('*')
                .eq('id', id)
                .single()

            return { user: user || null, error: null }
        }

        return { user: null, error: 'Failed to update user' }
    } catch (error) {
        console.error('Error updating user:', error)
        return { user: null, error: 'An unexpected error occurred' }
    }
}

export async function deleteUser(id: string): Promise<{ success: boolean; error: string | null }> {
    try {

        const { error } = await supabase.rpc('delete_user', { user_id: id })

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, error: null }
    } catch (error) {
        console.error('Error deleting user:', error)
        return { success: false, error: 'An unexpected error occurred' }
    }
}

export async function changeUserRole(
    _id: string,
    role: 'admin' | 'editor' | 'viewer'
): Promise<{ success: boolean; error: string | null }> {
    try {
        const { error } = await supabase.auth.updateUser({
            data: { role },
        })

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, error: null }
    } catch (error) {
        console.error('Error changing user role:', error)
        return { success: false, error: 'An unexpected error occurred' }
    }
}

export async function resetUserPassword(email: string): Promise<{ success: boolean; error: string | null }> {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, error: null }
    } catch (error) {
        console.error('Error resetting password:', error)
        return { success: false, error: 'An unexpected error occurred' }
    }
}   

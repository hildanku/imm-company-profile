import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import type { User } from '@/types'
import { createUser, updateUser } from '@/lib/repository/user'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const userSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    name: z.string().min(1, { message: 'Name is required' }),
    role: z.enum(['admin', 'editor', 'viewer'], {
        message: 'Please select a role'
    }),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .optional()
        .or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
}).refine(data => {
    if (data.password && data.password !== data.confirmPassword) {
        return false
    }
    return true
}, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})

interface UserUpsertProps {
    user?: User
    onSuccess: () => void
}

export function UserUpsert({ user, onSuccess }: UserUpsertProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const isEditing = !!user

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: user?.email || '',
            name: user?.name || '',
            role: user?.role || 'viewer',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof userSchema>) => {
        try {
            setIsSubmitting(true)

            if (isEditing && user) {
                const { error } = await updateUser(user.id, {
                    email: data.email,
                    name: data.name,
                    role: data.role,
                })

                if (error) {
                    toast.error(`Failed to update user: ${error}`)
                    return
                }

                toast.success('User updated successfully')
            } else {
                // Create new user
                if (!data.password) {
                    toast.error('Password is required for new users')
                    return
                }

                const { error } = await createUser({
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    role: data.role,
                })

                // const { authData: _authData, err: err } = await supabase.auth.signUp({
                //     email: data.email,
                //     password: data.password,
                //     options: {
                //         data: {
                //             name: data.name,
                //         }
                //     }
                // })

                // console.info("auth data from upsert management", _authData)

                if (error) {
                    toast.error(`Failed to create user: ${error} or {err}`)
                    return
                }

                toast.success('User created successfully')
            }

            onSuccess()
        } catch (error) {
            console.error('Error submitting user form:', error)
            toast.error('An unexpected error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{isEditing ? 'Edit User' : 'Create New User'}</CardTitle>
                <CardDescription>
                    {isEditing
                        ? 'Update user information and permissions'
                        : 'Add a new user to the system'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="user@example.com"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Full Name"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={isSubmitting}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="editor">Editor</SelectItem>
                                            <SelectItem value="viewer">Viewer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {!isEditing && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Enter password"
                                                    {...field}
                                                    disabled={isSubmitting}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Confirm password"
                                                    {...field}
                                                    disabled={isSubmitting}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        <div className="flex justify-end space-x-2">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="gap-2"
                            >
                                {isSubmitting && <Spinner className="h-4 w-4" />}
                                {isEditing ? 'Update User' : 'Create User'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

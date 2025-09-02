import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import type { User } from '@/types'
import { createUser, updateUser } from '@/lib/repository/user'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { userSchema } from '@/lib/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UserUpsertProps {
    user?: User
    onSuccess: () => void
}

export function UserUpsert({ user, onSuccess }: UserUpsertProps) {
    const queryClient = useQueryClient()
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

    const upsertMutation = useMutation({
        mutationFn: async (data: z.infer<typeof userSchema>) => {
            if (isEditing && user) {
                return updateUser(user.id, {
                    email: data.email,
                    name: data.name,
                    role: data.role,
                })
            }

            if (!data.password) {
                throw new Error('Password is required for new users')
            }

            return createUser({
                email: data.email,
                password: data.password,
                name: data.name,
                role: data.role,
            })
        },
        onSuccess: (result) => {
            if (result?.error) {
                toast.error(
                    isEditing
                        ? `Failed to update user: ${result.error}`
                        : `Failed to create user: ${result.error}`
                )
                return
            }

            toast.success(
                isEditing ? 'User updated successfully' : 'User created successfully'
            )
            queryClient.invalidateQueries({ queryKey: ['users'] })
            onSuccess()
        },
        onError: (err: any) => {
            toast.error(err.message || 'An unexpected error occurred')
        },
    })

    const onSubmit = (data: z.infer<typeof userSchema>) => {
        upsertMutation.mutate(data)
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
                                            disabled={upsertMutation.isPending}
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
                                            disabled={upsertMutation.isPending}
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
                                        disabled={upsertMutation.isPending}
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
                                                    disabled={upsertMutation.isPending}
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
                                                    disabled={upsertMutation.isPending}
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
                                disabled={upsertMutation.isPending}
                                className="gap-2"
                            >
                                {upsertMutation.isPending && <Spinner className="h-4 w-4" />}
                                {isEditing ? 'Update User' : 'Create User'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}


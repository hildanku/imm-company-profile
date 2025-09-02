import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import type { Career, CareerApplication } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { careerApplicationSchema } from '@/lib/zod'
import { careerApplicationRepository } from '@/lib/repository/career-application'
import { careerRepository } from '@/lib/repository/career'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface CareerApplicationUpsertProps {
    careerApplication?: CareerApplication
    onSuccess: () => void
}

export function CareerApplicationUpsert({ careerApplication, onSuccess }: CareerApplicationUpsertProps) {
    const queryClient = useQueryClient()
    const isEditing = !!careerApplication

    const form = useForm<z.infer<typeof careerApplicationSchema>>({
        resolver: zodResolver(careerApplicationSchema),
        defaultValues: {
            career_id: careerApplication?.career_id || '',
            full_name: careerApplication?.full_name || '',
            email: careerApplication?.email || '',
            phone: careerApplication?.phone || '',
            portfolio_url: careerApplication?.portfolio_url || '',
            cv_url: careerApplication?.cv_url || '',
            status: careerApplication?.status || 'Pending',
        },
    })

    const { data: careers, isLoading: loadingCareers } = useQuery({
        queryKey: ['careers'],
        queryFn: async () => {
            const result = await careerRepository.list({
                sort: 'title',
                order: 'ASC',
                limit: 100,
                page: 1,
            })
            return result.items as Career[]
        },
    })

    const upsertMutation = useMutation({
        mutationFn: async (data: z.infer<typeof careerApplicationSchema>) => {
            if (isEditing && careerApplication) {
                return careerApplicationRepository.update({
                    id: careerApplication.id,
                    item: data,
                })
            }
            return careerApplicationRepository.create({ item: data })
        },
        onSuccess: (result) => {
            if (!result || (Array.isArray(result) && result.length === 0)) {
                toast.error(
                    isEditing ? 'Failed to update application' : 'Failed to create application'
                )
                return
            }

            toast.success(
                isEditing ? 'Application updated successfully' : 'Application created successfully'
            )
            queryClient.invalidateQueries({ queryKey: ['career-applications'] })
            onSuccess()
        },
        onError: () => {
            toast.error('An unexpected error occurred')
        },
    })

    const onSubmit = (data: z.infer<typeof careerApplicationSchema>) => {
        upsertMutation.mutate(data)
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>
                    {isEditing ? 'Edit Application' : 'Create New Application'}
                </CardTitle>
                <CardDescription>
                    {isEditing ? 'Update application information' : 'Add a new career application'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="career_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Career</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        disabled={upsertMutation.isPending || loadingCareers}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={
                                                        loadingCareers ? 'Loading careers...' : 'Select Career'
                                                    }
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {careers?.map((c) => (
                                                <SelectItem key={c.id} value={c.id}>
                                                    {c.title} — {c.position}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="john.doe@example.com"
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
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="+62 812 3456 7890"
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
                            name="portfolio_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Portfolio URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://yourportfolio.com"
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
                            name="cv_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CV URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://storage.example.com/path/to/cv.pdf"
                                            {...field}
                                            disabled={upsertMutation.isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            disabled={upsertMutation.isPending}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Reviewed">Reviewed</SelectItem>
                                                <SelectItem value="Accepted">Accepted</SelectItem>
                                                <SelectItem value="Rejected">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button
                                type="submit"
                                disabled={upsertMutation.isPending}
                                className="gap-2"
                            >
                                {upsertMutation.isPending && <Spinner className="h-4 w-4" />}
                                {isEditing ? 'Update Application' : 'Create Application'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

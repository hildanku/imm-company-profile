import { useNavigate } from '@tanstack/react-router'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { loginSchema } from '@/lib/zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import supabase from '@/lib/supabase'
import { toast } from 'sonner'

export const Route = createFileRoute('/_auth/login')({
 	component: LoginPage,
})


function LoginPage() {
	const navigate = useNavigate()

	const form = useForm<z.infer<typeof loginSchema>>({
		mode: 'all',
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const submit = async (data: z.infer<typeof loginSchema>) => {
		try {
			const { data: _userData, error } = await supabase.auth.signInWithPassword({
				email: data.email,
				password: data.password,
			})
			
			console.log('Login data:', data)
			
			if (error) {
				toast.error(error.message)
				return
			}
			
			toast.success('Login berhasil')
			navigate({ to: '/' })
		} catch (error) {
			console.error('Login error:', error)
			toast.error('Terjadi kesalahan saat login')
		}
	}

	return (
		<Form {...form}>
			<Card className='mx-auto max-w-sm'>
				<CardHeader>
					<CardTitle className='text-2xl'>Login</CardTitle>
					<CardDescription>Enter your email below to login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={form.handleSubmit(submit)}>
						<div className='grid gap-4'>
							<div className='grid gap-2'>
								<FormField
									name='email'
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input type='email' placeholder='Masukkan email' {...field} />
											</FormControl>
											<FormMessage className='font-normal' />
										</FormItem>
									)}
								/>
							</div>
							<div className='grid gap-2'>
								<FormField
									name='password'
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input type='password' placeholder='Masukkan password' {...field} />
											</FormControl>
											<FormMessage className='font-normal' />
										</FormItem>
									)}
								/>
							</div>
							<Button type='submit' className='w-full gap-2.5' disabled={form.formState.isSubmitting}>
								{form.formState.isSubmitting && <Spinner />}
								<span>Login</span>
							</Button>
						</div>
						<div className='mt-4 text-center text-sm'>
							Don&apos;t have an account?{' '}
							<Link to='/register' className='underline'>
								Register
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</Form>
	)
}
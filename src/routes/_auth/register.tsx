import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { registerSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import supabase from '@/lib/supabase'
import { toast } from 'sonner'

export const Route = createFileRoute('/_auth/register')({
  component: RegisterPage,
})

function RegisterPage() {
	const navigate = useNavigate()

	const form = useForm<z.infer<typeof registerSchema>>({
		mode: 'all',
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			name: '',
			password: '',
			passwordConfirm: '',
		},
	})

	const submit = async (data: z.infer<typeof registerSchema>) => {
		try {
			const { data: _userData, error } = await supabase.auth.signUp({
				email: data.email,
				password: data.password,
				options: {
					data: {
						name: data.name,
					},
				},
			})

			if (error) {
				toast.error(error.message)
				return
			}

			toast.success('Register berhasil')
			navigate({
				to: '/login',
			})
		} catch (error) {
			console.error('Registration error:', error)
			toast.error('Terjadi kesalahan saat registrasi')
		}
	}

	return (
		<Form {...form}>
			<Card className='mx-auto max-w-sm'>
				<CardHeader>
					<CardTitle className='text-2xl'>Register</CardTitle>
					<CardDescription>Enter your email below to register to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={form.handleSubmit(submit)}>
						<div className='grid gap-4'>
							<div className='grid gap-2'>
								<FormField
									name='name'
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nama</FormLabel>
											<FormControl>
												<Input type='name' placeholder='Masukkan nama' {...field} />
											</FormControl>
											<FormMessage className='font-normal' />
										</FormItem>
									)}
								/>
							</div>
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
							<div className='grid gap-2'>
								<FormField
									name='passwordConfirm'
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Konfirmasi Password</FormLabel>
											<FormControl>
												<Input
													type='password'
													placeholder='Masukkan konfirmasi password'
													{...field}
												/>
											</FormControl>
											<FormMessage className='font-normal' />
										</FormItem>
									)}
								/>
							</div>
							<Button type='submit' className='w-full gap-2.5' disabled={form.formState.isSubmitting}>
								{form.formState.isSubmitting && <Spinner />}
								<span>Register</span>
							</Button>
						</div>
						<div className='mt-4 text-center text-sm'>
							Already have an account?{' '}
							<Link to='/login' className='underline'>
								Login
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</Form>
	)
}
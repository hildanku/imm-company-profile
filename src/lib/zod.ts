import z from 'zod'

export const loginSchema = z.object({
    email: z.string({ message: 'Email tidak valid' }).email({ message: 'Email tidak valid' }),
    password: z
        .string({ message: 'Password tidak valid' })
        .min(8, { message: 'Password minimal 8 karakter' })
        .max(255, { message: 'Password terlalu panjang' }),
})

export const registerSchema = z
	.object({
		email: z.string({ message: 'Email tidak valid' }).email({ message: 'Email tidak valid' }),
		name: z.string({ message: 'Nama tidak valid' }).min(1, { message: 'Nama tidak boleh kosong' }),
		password: z
			.string({ message: 'Password tidak valid' })
			.min(8, { message: 'Password harus lebih dari 8 karakter' }),
		passwordConfirm: z.string({ message: 'Konfirmasi password tidak valid' }).min(8, {
			message: 'Konfirmasi password harus lebih dari 8 karakter',
		}),
	})
	.refine(
		(data) => {
			return data.passwordConfirm === data.password
		},
		{
			message: 'Konfirmasi password gagal',
			path: ['passwordConfirm'],
		}
	)

export const postSchema = z
	.object({
		title: z.string().min(1, 'Title is required'),
		slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/i, 'Only letters, numbers and hyphens'),
		label: z.string().optional().default(''),
		author: z.string().min(1, 'Author is required'),
		url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
		body: z.string().min(1, 'Content is required'),
		is_published: z.boolean().default(false),
	}
)
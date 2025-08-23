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

export const careerSchema = z.object({
    title: z.string().min(1, { message: 'Job title is required' }),
    position: z.string().min(1, { message: 'Position is required' }),
    description: z.string().min(1, { message: 'Job description is required' }),
    type: z.enum(['FullTime', 'PartTime', 'Freelance', 'Internship'], {
        message: 'Please select a job type'
    }),
    location: z.string().min(1, { message: 'Location is required' }),
    work_arrangement: z.enum(['Hybrid', 'Remote', 'On-Site'], {
        message: 'Please select a work arrangement'
    }),
    deadline: z.string().min(1, { message: 'Deadline is required' }),
    status: z.enum(['Open', 'Closed'], {
        message: 'Please select a status'
    }),
    image: z.string().optional(),
})

// form schema for applying to a career
export const formApplySchema = z.object({
    fullName: z.string().min(3, { message: 'Full name must be at least 3 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
    // address: z.string().min(10, { message: 'Address must be at least 10 characters' }),
    // education: z.string().min(3, { message: 'Education must be at least 3 characters' }),
    // experience: z.string().min(10, { message: 'Experience must be at least 10 characters' }),
    // coverLetter: z.string().min(50, { message: 'Cover letter must be at least 50 characters' }),
    portfolioUrl: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
    cv: z.instanceof(File, { message: 'Please upload your CV' }),
})
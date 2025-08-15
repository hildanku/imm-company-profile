import z from 'zod'

export const loginSchema = z.object({
    email: z.string({ message: 'Email tidak valid' }).email({ message: 'Email tidak valid' }),
    password: z
        .string({ message: 'Password tidak valid' })
        .min(8, { message: 'Password minimal 8 karakter' })
        .max(255, { message: 'Password terlalu panjang' }),
})
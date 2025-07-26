import { z } from 'zod'

export const LoginSchema = z.object({
	username: z.string().optional(),
	password: z.string().min(1, { message: 'Password harus diisi' }),
})

export type Login = z.infer<typeof LoginSchema>

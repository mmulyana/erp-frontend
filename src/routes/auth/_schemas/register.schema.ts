import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: 'Masukkan nama Anda' }),
    email: z.string().email(),
    password: z
      .string()
      .min(
        8,
        'Silakan masukkan kata sandi yang terdiri dari minimal 8 karakter'
      ),
    confirmPassword: z
      .string()
      .min(
        6,
        'Silakan masukkan konfirmasi kata sandi yang terdiri dari minimal 8 karakter'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords tidak sama',
    path: ['confirmPassword'],
  })

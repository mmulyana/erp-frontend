import { z } from 'zod'

export const LoginSchema = z.object({
  name: z.string().min(1, { message: 'Masukkan nama atau email Anda' }),
  password: z.string().min(8, {
    message: 'Silakan masukkan kata sandi yang terdiri dari minimal 8 karakter',
  }),
})

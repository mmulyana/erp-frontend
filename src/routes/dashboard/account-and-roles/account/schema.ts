import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(1, { message: 'nama account wajib terisi' }),
  email: z.string().email('email account wajib terisi'),
})

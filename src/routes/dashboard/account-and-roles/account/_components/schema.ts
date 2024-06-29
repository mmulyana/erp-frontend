import { z } from 'zod'

export const userEditSchema = z.object({
  name: z.string().min(1, { message: 'nama account wajib terisi' }),
  email: z.string().email('email account wajib terisi'),
  rolesId: z.number().optional(),
})

export const userCreateSchema = z.object({
  name: z.string().min(1, { message: 'nama account wajib terisi' }),
  email: z.string().email('email account wajib terisi'),
  rolesId: z.number().optional(),
  password: z.string().optional(),
})

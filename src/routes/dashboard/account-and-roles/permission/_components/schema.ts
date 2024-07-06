import { z } from 'zod'

export const permissionCreateSchema = z.object({
  name: z.string().min(1, { message: 'nama grup wajib terisi' }),
  description: z.string().optional(),
  permissionNames: z
    .array(
      z.object({
        name: z.string(),
      })
    )
    .optional(),
})

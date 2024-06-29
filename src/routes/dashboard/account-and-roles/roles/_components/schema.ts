import { z } from 'zod'

export const rolesCreateSchema = z.object({
  name: z.string().min(1, { message: 'nama role wajib terisi' }),
})
import { z } from 'zod'

export const createRoleSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  permissionIds: z.number().array(),
})
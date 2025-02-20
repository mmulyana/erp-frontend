import { z } from 'zod'

export const CreateRoleSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	// permissionIds: z.string().array(),
})

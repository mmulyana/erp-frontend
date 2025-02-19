import { z } from 'zod'
import {
	CreateUserSchema,
	UpdateAccountSchema,
	UpdatePasswordSchema,
} from '../schema'

export type CreateUser = z.infer<typeof CreateUserSchema>
export type UpdatePassword = z.infer<typeof UpdatePasswordSchema>
export type UpdateUser = z.infer<typeof UpdateAccountSchema>

import { z } from 'zod'
import { CreateRoleSchema } from '../schema'

export type Role = {
	id: string
	name: string
	description?: string
	updatedAt: string
	createdAt: string
	permissions: string[]
	RolePermission: RolePermission[]
	_count: {
		users: number
	}
}

export type RolePermission = {
	id: number
	roleId: number
	permissionId: number
	createdAt: string
	permission: Permission
}

export type PermissionGroup = {
	id: number
	name: string
	description: string
	createdAt: string
	updatedAt: string
	permissions: Permission[]
}

export type Permission = {
	key: string
	name: string
	description: string
	groupId: number | null
	createdAt: string
	updatedAt: string
}

export type CreateRole = z.infer<typeof CreateRoleSchema>

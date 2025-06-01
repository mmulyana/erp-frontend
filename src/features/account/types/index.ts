export type UserForm = {
	roleId?: string
	username: string
	phone?: string
	email?: string
	photoUrl?: File | null | string
}

export type PasswordForm = {
	oldPassword: string
	newPassword: string
}
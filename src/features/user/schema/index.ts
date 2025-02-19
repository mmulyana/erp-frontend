import { z } from 'zod'

// Regex to allow only A-Z and a-z (no numbers or special characters)
const usernameRegex = /^[A-Za-z\s]+$/

// Regex for phone number validation
const phoneNumberRegex = /^([\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/

export const CreateUserSchema = z.object({
	username: z
		.string()
		.min(1, 'Nama harus lebih dari 1 huruf')
		.refine(
			(val) => usernameRegex.test(val),
			'Username hanya boleh mengandung huruf A-Z dan a-z (tanpa angka atau karakter khusus)'
		),
	email: z.string().refine((val) => {
		if (val === '') return true
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
	}, 'Format email salah'),
	phone: z.string().refine((val) => {
		if (val === '') return true
		return phoneNumberRegex.test(val)
	}, 'Format nomor telepon salah'),
})

export const UpdateAccountSchema = CreateUserSchema.partial()

export const UpdatePasswordSchema = z
	.object({
		oldPassword: z.string().min(1, 'Password lama harus diisi'),
		newPassword: z.string().min(8, 'Password sekurangnya 8 karakter'),
	})
	.strict()

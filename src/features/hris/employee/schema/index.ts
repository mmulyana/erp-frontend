import { z } from 'zod'

export const EmployeeSchema = z.object({
	fullname: z.string(),
	position: z.string(),
	birthDate: z.string().optional(),
	joinedAt: z.string().optional(),
	lastEducation: z.string().optional(),
	salary: z.number().int().optional(),
	overtimeSalary: z.number().int().optional(),
	address: z.string().optional(),
	phone: z.string().optional(),
	photoUrl: z.any(),
})

export const ACCEPTED_FILE_TYPES = [
	'application/pdf',
	'image/png',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
export const MAX_FILE_SIZE = 10 * 1024 * 1024

export const CertifSchema = z.object({
	certif_file: z
		.custom<File>()
		.refine(
			(file) => !file || file.size <= MAX_FILE_SIZE,
			'File harus kurang dari 5MB'
		)
		.refine(
			(file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
			'File harus berupa PDF, PNG, atau DOCX'
		)
		.nullable(),
	certif_name: z.string().min(1, 'Nama sertifikat wajib diisi'),
	competencyId: z.string().nullable(),
	expiry_month: z.string().min(1, 'Bulan kadaluwarsa wajib diisi'),
	expiry_year: z
		.string()
		.min(1, 'Tahun kadaluwarsa wajib diisi')
		.regex(/^\d{4}$/, 'Tahun harus 4 digit'),
	issue_month: z.string().min(1, 'Bulan terbit wajib diisi'),
	issue_year: z
		.string()
		.min(1, 'Tahun terbit wajib diisi')
		.regex(/^\d{4}$/, 'Tahun harus 4 digit'),
	issuing_organization: z.string().min(1, 'Penyelenggara/penerbit wajib diisi'),
})

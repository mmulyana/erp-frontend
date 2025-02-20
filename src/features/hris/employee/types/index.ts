import { z } from 'zod'
import { CertifSchema } from '../schema'

export type PayloadCreateEmployee = {
	fullname: string
	joined_at?: string
	joined_type?: string
	employment_type?: string
	last_education?: string
	gender?: string
	place_of_birth?: string
	birth_date?: string
	marital_status?: string
	religion?: string
	basic_salary?: string | undefined
	pay_type?: string
	overtime_salary?: string | undefined
	positionId?: string
	competencies: string[]
	safety_induction_date?: string | Date
	email?: string
}

export type CreateEmployee = PayloadCreateEmployee & {
	photo: File | null
	certif_file?: File | null
	certif_name: string
	issuing_organization?: string
	issue_year?: string
	issue_month?: string
	expiry_year?: string
	expiry_month?: string
	competencyId?: string
	certifications: CreateCertif[]
}

export type CreateCertif = {
	certif_file?: File | null
	certif_name: string
	issuing_organization?: string
	issue_year?: string
	issue_month?: string
	expiry_year?: string
	expiry_month?: string
	competencyId?: string | null
}

export type PayloadUploadPhoto = {
	id: number
	photo: File
}

export type CertifFormValues = z.infer<typeof CertifSchema>

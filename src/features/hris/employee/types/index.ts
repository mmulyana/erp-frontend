import { Base, Employee } from '@/shared/types'

export type EmployeeForm = {
	fullname: string
	address?: string
	birthDate?: Date
	joinedAt?: Date
	lastEducation?: string
	overtimeSalary?: number
	phone?: string
	position?: string
	salary?: number
	photoUrl?: File | string | null
	safetyInductionDate?: Date
	payType?: 'monthly' | 'daily'
}

export type CertificateForm = {
	employeeId: string
	file: File
	name?: string
	publisher?: string
	issueDate?: Date
	expiryDate?: Date
}

export type Certificate = Base & {
	employeeId: string
	expiryDate: string
	issueDate: string
	fileUrl: string
	name: string
	publisher: string
	employee: Employee
}

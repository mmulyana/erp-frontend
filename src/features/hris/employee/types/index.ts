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
}

export type CertificateForm = {
	employeeId: string
	file: File
	name?: string
	publisher?: string
	issueDate?: Date
	expiryDate?: Date
}
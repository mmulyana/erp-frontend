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
}

export type CertificateForm = {
	employeeId: string
	file: File
	name?: string
	publisher?: string
	issueDate?: Date
	expiryDate?: Date
}

export type Certificate = {
	id: string
	name: string
	fileUrl: string
	publisher: string
	issueDate: string
	expiryDate: string
}
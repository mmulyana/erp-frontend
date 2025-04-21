import { Base, Employee } from "@/shared/types"

export type Overtime = {
	totalHour: number
	note?: string
	date: string
	id: string
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
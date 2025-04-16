import { Employee } from '@/shared/types'

export type CashAdvance = {
	id: string
	employeeId: string
	createdBy: string
	amount: number
	date: string
	note?: string

	craetedAt: string
	updatedAt: string
	deleted?: string

	employee: Employee
}

export type CashAdvanceForm = {
	employeeId: string
	amount: number
	date: Date
	note?: string
}

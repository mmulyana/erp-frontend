import { Employee } from '@/shared/types'

export type CashAdvance = {
	id: string
	employeeId: string
	createdBy: string
	amount: number
	date: string
	note?: string
	status: "notYetPaidOff" | "paidOff"

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

export type Total = {
	total: number
}

export type TotalInYear = Total & {
	lastYear: number
}
export type TotalInMonth = Total & {
	lastMonth: number
}
export type TotalInDay = Total & {
	lastDay: number
}

export type ReportLastSixMonth = {
	chartData: { month: number; total: number }[]
	mean: number
}

export type ReportTop = {
	fullname: string
	position: string
	total: number
}

export type FormProcess = {
	workDay: number
	overtimeHour: number
	deduction: number
	salary: number
	overtimeSalary: number
	deductions: {
		type: string
		name: string
		amount: number
		referenceId?: string
	}[]
	paymentType: string
}

export type Attendance = {
	employeeId: string
	fullname: string
	position: string
	status: null | 'presence' | 'absent'
}

export type TotalAttendancePerDay = {
	total_absent: number
	total_presence: number
	total_notYet: number
}

export type OvertimeForm = {
	employeeId: string
	date: Date
	totalHour: number
	note?: string
}

export type OvertimeDetail = {
	id: string
	date: string
	note?: string
	totalHour: number
	employee: {
		fullname: string
		position: string
		id: string
	}
}

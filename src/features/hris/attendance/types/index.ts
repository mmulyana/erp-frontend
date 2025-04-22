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
export type Overtime = {
	totalHour: number
	note?: string
	date: string
	id: string
}
export type OvertimeDetail = Overtime & {
	employee: {
		fullname: string
		position: string
		id: string
	}
}

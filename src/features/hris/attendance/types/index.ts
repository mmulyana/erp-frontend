export type TotalAttendancePerDay = {
	total_absent: number
	total_presence: number
	total_notYet: number
}

export type OvertimeForm = {
	employeeId: string
	date?: Date
	totalHour: number
	note?: string
}

export type Attendance = {
	employeeId: string
	fullname: string
	position: string
	status: null | 'presence' | 'absent'
}

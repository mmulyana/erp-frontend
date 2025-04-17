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
export type Attendance = {
  id: number
  employeeId: number
  date: Date
  timeIn: string
  timeOut: string
  period: number
  isOnLeave?: boolean
  leaveId?: number
}

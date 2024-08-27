import { Employee } from './employee'

export type Attendance = {
  id: number
  employeeId: number
  date: string
  total_hour: number
  isOnLeave?: boolean
  leaveId?: number
  employee: Employee
}

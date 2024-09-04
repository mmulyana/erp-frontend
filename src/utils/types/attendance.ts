import { Employee } from './employee'

export type Attendance = {
  id: number
  employeeId: number
  date: string
  total_hour: number
  type: 'presence' | 'absent' | 'leave'
  leaveId?: number
  employee?: Employee
}

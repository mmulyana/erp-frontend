import { Employee } from './employee'

export type Leave = {
  id: number
  employeeId: number
  startDate: string
  endDate: string
  leaveType: string
  employee: Employee
  description?: string
}

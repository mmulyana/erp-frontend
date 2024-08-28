import { Employee } from './employee'

export type Overtime = {
  id: number
  employeeId: number
  date: string
  total_hour: number
  description?: string
  employee?: Employee
}

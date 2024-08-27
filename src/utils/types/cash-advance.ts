import { Employee } from './employee'

export type CashAdvance = {
  id: number
  employeeId: number
  amount: number
  requestDate: string
  employee: Employee
  description?: string
}

import { Status } from '../enum/common'

export type CashAdvance = {
  id: number
  employeeId: number
  amount: number
  requestDate: Date
  approvalDate: Date
  status: Status
}

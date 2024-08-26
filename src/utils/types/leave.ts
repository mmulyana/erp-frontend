import { LeaveType, Status } from '../enum/common'

export type Leave = {
  id: number
  employeeId: number
  startDate: Date
  endDate: Date
  leaveType: LeaveType
  status: Status
}

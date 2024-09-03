import { z } from 'zod'

export type LeaveSchema = z.infer<typeof leaveSchema>
export const leaveSchema = z.object({
  employeeId: z.string(),
  startDate: z.string().date(),
  endDate: z.string().date(),
  leaveType: z.string(),
  description: z.string().optional(),
})

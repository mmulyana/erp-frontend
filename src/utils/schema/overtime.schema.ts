import { z } from 'zod'

export type OvertimeSchema = z.infer<typeof overtimeSchema>
export const overtimeSchema = z.object({
  employeeId: z.string(),
  date: z.string(),
  total_hour: z.number(),
  description: z.string().optional(),
})

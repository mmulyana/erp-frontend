import { z } from 'zod'

export type CashAdvancesSchema = z.infer<typeof cashAdvanceSchema>
export const cashAdvanceSchema = z.object({
  employeeId: z.string(),
  amount: z.number(),
  requestDate: z.string().date(),
  description: z.string().optional(),
})

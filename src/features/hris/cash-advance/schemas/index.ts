import { z } from 'zod'

export const CashAdvanceSchema = z.object({
	employeeId: z.string(),
	amount: z.number(),
	date: z.date(),
	note: z.string().optional(),
})

export type CashAdvanceForm = z.infer<typeof CashAdvanceSchema>

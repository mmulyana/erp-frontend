import { z } from 'zod'

export const createRecapSchema = z.object({
  name: z.string().min(1, 'Nama periode tidak boleh kosong'),
  start_date: z.string().date(),
  end_date: z.string().date(),
})

export const updateRecapSchema = createRecapSchema.partial()

import { z } from 'zod'
import { CreateRecapSchema } from '../schema'

export type CreateRecap = z.infer<typeof CreateRecapSchema>

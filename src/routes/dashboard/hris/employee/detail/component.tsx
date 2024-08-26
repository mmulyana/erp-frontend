import { z } from 'zod'

const employeeSchema = z.object({
  fullname: z.string(),
  nickname: z.string().optional(),
  hireDate: z.string().optional(),
  salary_per_month: z.number().optional(),
  salary_per_day: z.number().optional(),
  salary_per_hour: z.number().optional(),
  status: z.enum(['active', 'nonactive']),
  place_of_birth: z.string().optional(),
  birthdate: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  marital_status: z
    .enum(['single', 'married', 'divorced', 'widowed'])
    .optional(),
  nik: z.string().optional(),
  kk: z.string().optional(),
  religion: z.string().optional(),
  positionId: z.number().optional(),
})
type EmployeeSchema = z.infer<typeof employeeSchema>

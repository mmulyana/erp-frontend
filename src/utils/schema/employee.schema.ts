import { z } from 'zod'
import {
  AddressType,
  ContactType,
  EmployeeStatus,
  Gender,
  MaritalStatus,
} from '../enum/common'

const EmployeeStatusEnum = z.enum([
  EmployeeStatus.active,
  EmployeeStatus.nonactive,
])
const GenderEnum = z.enum([Gender.male, Gender.female])
const MaritalStatusEnum = z.enum([
  MaritalStatus.single,
  MaritalStatus.married,
  MaritalStatus.divorced,
  MaritalStatus.widowed,
])
const ContactTypeEnum = z.enum([
  ContactType.email,
  ContactType.phoneNumber,
  ContactType.socialMedia,
])
const AddressTypeEnum = z.enum([
  AddressType.domicile,
  AddressType.origin,
  AddressType.alternative,
])

const CertificationSchema = z.object({
  name: z.string(),
  issuingOrganization: z.string(),
  issueDate: z.string(),
  expiryDate: z.string(),
  employeeId: z.number(),
})

const CompetencySchema = z.object({
  name: z.string(),
})

const EmployeeCompetencySchema = z.object({
  competencyId: z.number(),
  certificationId: z.number(),
  competency: CompetencySchema,
})

const AddressSchema = z.object({
  type: AddressTypeEnum,
  rt: z.string().optional(),
  rw: z.string().optional(),
  kampung: z.string().optional(),
  desa: z.string().optional(),
  kecamatan: z.string().optional(),
  kabupaten: z.string().optional(),
  provinsi: z.string().optional(),
  kodePos: z.number().optional(),
})

const ContactSchema = z.object({
  type: ContactTypeEnum,
  value: z.string(),
  isPrimary: z.boolean(),
})

const PositionSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})

const EmployeeSchema = z.object({
  fullname: z.string(),
  hireDate: z.date().optional(),
  salary_per_month: z.number().optional(),
  salary_per_day: z.number().optional(),
  salary_per_hour: z.number().optional(),
  status: EmployeeStatusEnum.optional(),
  place_of_birth: z.string().optional(),
  birthdate: z.string().optional(),
  gender: GenderEnum.optional(),
  marital_status: MaritalStatusEnum.optional(),
  nik: z.string().optional(),
  kk: z.string().optional(),
  religion: z.string().optional(),
  positionId: z.number().optional(),
  last_education: z.string().optional(),
  position: PositionSchema.optional(),
  contact: z.array(ContactSchema).optional(),
  address: z.array(AddressSchema).optional(),
  employeeCompetency: z.array(EmployeeCompetencySchema).optional(),
  certifications: z.array(CertificationSchema).optional(),
})

export const EmployeeValidationSchema = EmployeeSchema
export type EmployeeValidationType = z.infer<typeof EmployeeSchema>

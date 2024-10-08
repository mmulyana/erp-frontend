import {
  AddressType,
  ContactType,
  EmployeeStatus,
  Gender,
  MaritalStatus,
} from '../enum/common'
import { Attendance } from './attendance'
import { CashAdvance } from './cash-advance'
import { Leave } from './leave'
import { Overtime } from './overtime'
import { Position } from './position'

export type Employee = {
  id?: number
  fullname: string
  nickname?: string
  hireDate?: Date
  salary_per_month?: number
  salary_per_day?: number
  salary_per_hour?: number
  status?: EmployeeStatus
  place_of_birth?: string
  birthdate?: string
  gender?: Gender
  marital_status?: MaritalStatus
  nik?: string
  kk?: string
  religion?: string
  positionId?: number
  last_education?: string
  position?: Position
  contact?: Contact[]
  address?: Address[]
  employeeCompetency?: EmployeeCompetency[]
  certifications?: Certification[]
  attendances?: Attendance[]
  cashAdvances?: CashAdvance[]
  leaves?: Leave[]
  statusTracks?: EmployeeStatusTrack[]
  overtime?: Overtime[]
}

type EmployeeCompetency = {
  id: number
  employeeId: number
  competencyId: number
  certificationId: number
  employee: Employee
  competency: Competency
}

type Competency = {
  id: number
  name: string
  EmployeeCompetency: EmployeeCompetency[]
}

type Certification = {
  id?: number
  name: string
  issuingOrganization: string
  issueDate: string
  expiryDate: string
  employeeId: number
  employee?: Employee
}

type Contact = {
  id: number
  type: ContactType
  value: string
  employeeId: number
  isPrimary: boolean
  employee: Employee
}

type Address = {
  id: number
  type: AddressType
  rt?: string
  rw?: string
  kampung?: string
  desa?: string
  kecamatan?: string
  kebupaten?: string
  provinsi?: string
  kodePos?: number
  employeeId: number
  employee: Employee
}

type EmployeeStatusTrack = {
  id: number
  date: Date
  status: EmployeeStatus
  employeeId: number
  competencyId?: number
  comptency?: Competency
  employee: Employee
}

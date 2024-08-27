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
import { Position } from './position'

export type EmployeeInput = Omit<
  Employee,
  'attendances' | 'position' | 'cashAdvances' | 'leaves' | 'statusTracks'
>

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
  attendances?: Attendance[]
  cashAdvances?: CashAdvance[]
  leaves?: Leave[]
  contact?: Contact[]
  address?: Address[]
  statusTracks?: EmployeeStatusTrack[]
  employeeCompetency?: EmployeeCompetency[]
}

type EmployeeCompetency = {
  id: number
  employeeId: number
  competencyId: number
  certificationId: number
  employee: Employee
  competency: Competency
  certification: Certification
}

type Competency = {
  id: number
  name: string
  EmployeeCompetency: EmployeeCompetency[]
}

type Certification = {
  id: number
  name: string
  issuingOrganization: string
  issueDate: Date
  expiryDate: Date
  EmployeeCompetency: EmployeeCompetency[]
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
  employee: Employee
}

import {
  AddressType,
  ContactType,
  EmployeeStatus,
  Gender,
  MaritalStatus,
} from '../enum/common'
import { Attendance } from './attendance'
import { Leave } from './leave'
import { Overtime } from './overtime'
import { Position } from './position'

export interface Board {
  id: string
  name: string
  color: string
  position: number
  items: Item[]
}

export interface Project {
  id: number
  name: string
  startDate: null
  budget: string
  priority: string
  boardItemsId: string
  clientId: number
  boardItems: Item
  labels: LabelElement[]
  employees: Partial<Employee>[]
  comments: Comment[]
  client: Client
  _count: Count
}

export interface Item {
  id: string
  position: number
  containerId: string
  project?: Project
}

export interface Count {
  employees: number
  comments: number
}

export interface Client {
  name: string
  company: Company
}

export interface Company {
  logo: string
}

export interface Comment {
  comment: string
}

export interface LabelElement {
  label: LabelLabel
}

export interface LabelLabel {
  id: number
  name: string
  color: string
}

export type Goods = {
  id: number
  name: string
  qty: number
  available: number
  minimum: number
  photoUrl?: string
  locationId: number
  measurementId: number
  categoryId: number
  brandId: number
  brand: GoodsBrand
  category: GoodsCategory
  location: GoodsLocation
  measurement: GoodsMeasurement
}

export type GoodsBrand = {
  id: number
  name: string
  photoUrl?: string
}

export type GoodsCategory = {
  id: number
  name: string
}

export type GoodsLocation = {
  id: number
  name: string
}

export type GoodsMeasurement = {
  id: number
  name: string
}

export type Supplier = {
  id: number
  name: string
  phone?: string
  address?: string
  status: 'active' | 'nonactive'
  photoUrl?: string
  employees: SupplierEmployee[]
  tags: SupplierToTag[]
}

export type SupplierEmployee = {
  id: number
  name: string
  position?: string
  phone?: string
  status: 'active' | 'nonactive'
  supplierId: number
}

export type SupplierToTag = {
  id: number
  supplierId: number
  tagId: number
  tag: SupplierTag
}

export type SupplierTag = {
  id: number
  name: string
  color: string
}

export type Transaction = {
  id: number
  goodsId: number
  qty: number
  price: string
  photoUrl?: string
  supplierId: 1
  date: string
  type: 'in' | 'out' | 'borrowed' | 'returned' | 'opname'
  description?: string
  projectId?: number
  isReturned?: boolean
  project?: Partial<Project>
  good: Partial<Goods>
  supplier: Partial<Supplier>
}

// HRIS API
// EMPLOYEE
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

export type CashAdvance = {
  id: number
  employeeId: number
  amount: number
  requestDate: string
  employee: Employee
  description?: string
}

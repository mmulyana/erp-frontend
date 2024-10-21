import { AddressType, ContactType, EmployeeStatus } from '../enum/common'

export interface IApi<T = void> {
  data?: T
  message: string
}

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
  labels: ProjectToLabel[]
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
  id: number
  name: string
  company?: Company
  phone?: string
  email?: string
  position?: string
}

export interface Company {
  id: number
  logo: string
  name: string
  address?: string
  phone?: string
  email?: string
}

export interface Comment {
  comment: string
}

export interface ProjectToLabel {
  label: ProjectLabel
}

export interface ProjectLabel {
  id: number
  name: string
  color: string
  _count?: {
    projects?: number
  }
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
export type Employee = {
  id: number
  photo?: string
  fullname: string
  joined_at?: string
  joined_type?: 'date' | 'year'
  basic_salary?: number
  overtime_salary?: number
  pay_type?: 'daily' | 'monthly'
  employment_type?: 'permanent' | 'contract' | 'partime'
  status: 'active' | 'nonactive'
  place_of_birth?: string
  birth_date?: string
  gender?: 'male' | 'female'
  marital_status?: 'single' | 'merried' | 'divorced'
  religion?: string
  positionId?: number
  position?: Position
  attendances: Attendance[]
  cashAdvances: CashAdvance[]
  contacts: Contact[]
  addresses: Address[]
  statusTracks: EmployeeStatusTrack[]
  competencies: EmployeeCompetency[]
  certifications: Certification[]
  overtime: Overtime[]
  EmployeeAssigned: EmployeeAssigned[]
}

type EmployeeAssigned = {
  id: number
  projectId: number
  employeeId: number
  project: Project
  employee: Employee
}

type Attendance = {
  id: number
  employee: Employee
  employeeId: number
  date: string
  total_hour: number
  type: 'presence' | 'absent'
}

type Overtime = {
  id: number
  employeeId: number
  employee: Employee
  date: string
  total_hour: number
  description?: number
}

type Position = {
  id: number
  name: string
  color?: string
  description: string
}

type EmployeeCompetency = {
  id: number
  employeeId: number
  competencyId: number
  employee: Employee
  competency: Competency
}

export type Competency = {
  id: number
  name: string
  color: string
  EmployeeCompetency?: EmployeeCompetency[]
  _count?: {
    EmployeeCompetency?: number
    Certification?: number
  }
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
  value: string
  employeeId: number
  employee: Employee
}

type EmployeeStatusTrack = {
  id: number
  date: Date
  status: EmployeeStatus
  description?: string
  employeeId: number
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

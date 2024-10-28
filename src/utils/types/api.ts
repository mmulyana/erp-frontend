import { User } from './user'

export interface IApi<T = void> {
  data?: T
  message: string
}

export interface IApiPagination<T = void> extends IApi<T> {
  total: number
  page: number
  limit: number
  total_pages: number
}

export interface Board {
  id: string
  name: string
  color: string
  position: number
  items: Item[]
}

export type Project = {
  id: number
  name: string
  boardItemsId: string
  clientId: number | null
  leadId: number | null
  progress: number
  net_value: number | null
  boardItems: {
    container: {
      color: string
      name: string
    }
  }
  labels: {
    label: {
      id: number
      name: string
      color: string
    }
  }[]
  employees: {
    employee: {
      fullname: string
      photo: string
      id: number
    }
  }[]
  client?: {
    id: number
    name: string
  } | null
  lead?: {
    id: number
    fullname: string
    photo: string | null
  }
  _count: {
    employees: number
  }
}
export type ProjectDetail = Project & {
  description?: string
  payment_status: number
  date_created: Date
  date_started: string | null
  date_ended: string | null
  isArchive: boolean
  _count: {
    employees: number
    attachments: number
  }
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
  _count?: {
    goods?: number
  }
}

export type GoodsCategory = {
  id: number
  name: string
}

export type GoodsLocation = {
  id: number
  name: string
  _count?: {
    goods?: number
  }
}

export type GoodsMeasurement = {
  id: number
  name: string
  _count?: {
    goods?: number
  }
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
  tag: SupplierLabel
}

export type SupplierLabel = {
  id: number
  name: string
  color: string
  _count?: {
    supplier?: number
  }
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
  safety_induction_date?: string
  status: boolean
  place_of_birth?: string
  birth_date?: string
  gender?: 'male' | 'female'
  marital_status?: 'single' | 'merried' | 'divorced'
  religion?: string
  last_education?: string
  email?: string
  phoneNumbers?: PhoneNumber[]
  positionId?: number
  position?: Position
  isHidden?: boolean
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

export type PhoneNumber = {
  id: number
  value: string
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

export type Position = {
  id: number
  name: string
  color?: string
  description: string
  _count: {
    employees: number
  }
  employees?: Employee[]
}

export type EmployeeCompetency = {
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

export type Certification = {
  id: number
  certif_name: string
  certif_file?: number
  issuing_organization?: string
  issue_year?: number
  issue_month?: number
  expiry_year?: number
  expiry_month?: number
  expire_at?: number
  employeeId: number
  competencyId: number
  competency: Competency
  employee: Employee
}

type Contact = {
  id: number
  value: string
  employeeId: number
  employee: Employee
}

export type Address = {
  id: number
  type: string
  value: string
  employeeId?: number
  employee?: Employee
}

type EmployeeStatusTrack = {
  id: number
  date: Date
  status: boolean
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

export type Chart = {
  chartData: {
    position: string
    count: number
    fill: string
  }[]
  chartConfig: {
    [key: string]: {
      label: string
    }[]
  }
}

export type Activity = {
  attachments?: any[]
  comment: string
  id: number
  projectId: number
  replyId: number
  userId: number
  user: User
}

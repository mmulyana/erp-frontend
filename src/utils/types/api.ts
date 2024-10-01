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
  employees: EmployeeElement[]
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

export interface EmployeeElement {
  employee: EmployeeEmployee
}

export interface EmployeeEmployee {
  fullname: string
  photo?: string
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

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

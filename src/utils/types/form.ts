export type CreateSupplier = {
  name: string
  phone?: string
  email?: string
  address?: string
  status: string
  tags?: string[]
  photo?: File
}

export type CreateSupplierEmployee = {
  name: string
  position?: string
  phone?: string
  status: string
}

export type CreateTransaction = {
  goodsId: string
  qty: string
  price: string
  supplierId?: string
  date: string
  type: string
  description?: string
  projectId?: string
  isReturned?: string
  photo?: File | null
}

export type CreateClient = {
  name: string
  companyId?: number
  contact?: string
  email?: string
  position?: string
}

export type CreateClientCompany = {
  photo?: File | null
  name: string
  address?: string
  phone?: string
  email?: string
}

export type createLabel = {
  name: string
  color: string
}

export type createBrand = {
  name: string
  photo?: File | null
}

export type createPosition = {
  name: string
  color: string
  description?: string
}

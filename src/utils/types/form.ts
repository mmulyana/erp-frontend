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

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

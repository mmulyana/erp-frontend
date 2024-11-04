export type payloadCreateEmployee = {
  fullname: string
  joined_at?: string
  joined_type?: string
  employment_type?: string
  last_education?: string
  gender?: string
  place_of_birth?: string
  birth_date?: string
  marital_status?: string
  religion?: string
  basic_salary?: string | undefined
  pay_type?: string
  overtime_salary?: string | undefined
  positionId?: string
  competencies: string[]
  safety_induction_date?: string | Date
  email?: string
  addresses?: createAddress[]
  phoneNumbers?: createPhone[]
}

export type createEmployee = payloadCreateEmployee & {
  photo: File | null
  certif_file?: File | null
  certif_name: string
  issuing_organization?: string
  issue_year?: string
  issue_month?: string
  expiry_year?: string
  expiry_month?: string
  competencyId?: string
  certifications: createCertif[]
}

export type payloadUploadPhoto = {
  id: number
  photo: File
}

export type createCertif = {
  certif_file?: File | null
  certif_name: string
  issuing_organization?: string
  issue_year?: string
  issue_month?: string
  expiry_year?: string
  expiry_month?: string
  competencyId?: string | null
}

export type createAddress = {
  type: 'domicile' | 'origin' | 'alternative'
  value: string
}

export type createPhone = {
  value: string
}

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
}

export type CreateTransaction = {
  items: {
    goodsId: number | null
    qty: number | null
    price?: number | null
    type: string
  }[]
  supplierId?: number | null
  date: ''
}

export type updateTransaction = {
  qty?: number
  price?: number
  supplierId?: number
  date?: Date | string
  projectId?: number
}

export type CreateClient = {
  name: string
  companyId?: number | null
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

export type createProject = {
  name: string
  containerId: string
  progress?: number
  payment_status?: number
  description?: string
  date_started?: string | Date
  date_ended?: string | Date
  isArchive?: boolean
  net_value?: number
  leadId?: number
  clientId?: number
}

export type updateProject = Partial<createProject>

export type createActivity = {
  userId: number
  comment: string
  projectId: number
  replyId?: number | null
}

export type createAttachment = {
  name: string
  file: File
  type?: string
  uploaded_by?: number | null
  projectId: number
  isSecret: boolean
}

export type createEstimate = {
  id: number | null
  name: string
  price: number
  qty: number
}

export type createGoods = {
  name: string
  qty: number
  available: number
  minimum: number
  photo?: File
  photoUrl?: string | null
  locationId: number
  measurementId: number
  categoryId: number
  brandId: number
}

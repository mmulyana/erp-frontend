export type Company = {
	id: string
	name: string
	email?: string
	phone?: string
	address?: string
	photoUrl?: string
}

export type CompanyForm = Omit<Company, 'id' | 'photoUrl'> & {
	photoUrl?: string | File | null
}

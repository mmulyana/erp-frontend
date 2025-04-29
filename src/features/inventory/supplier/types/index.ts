export type SupplierForm = {
	name: string
	address?: string
	phone?: string
	email?: string
	googleMapUrl?: string
	photoUrl?: File | string | null
}

export type Supplier = {
	id: string
	name: string
	address?: string
	googleMapUrl?: string
	photoUrl?: string
	phone?: string
	email?: string

	stockIn: {
		id: string
		price: number
	}[]

	_count: {
		stockIn: number
	}

	createdAt: string
}

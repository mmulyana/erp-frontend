export type ItemForm = {
	name: string
	locationId?: string | null
	brandId?: string | null
	minimum?: number
	description?: string
	unitOfMeasurement?: string
	photoUrl?: string | File | null
}

export type Item = ItemForm & {
	id: string
	brand: {
		id: string
		name: string
	}
	location: {
		id: string
		name: string
	}
	quantity?: number
	available?: string
}

export type ItemForm = {
	name: string
	warehouseId?: string | null
	brandId?: string | null
	minimum?: number
	description?: string
	unitOfMeasurement?: string
	photoUrl?: string | File | null
	category?: string
}

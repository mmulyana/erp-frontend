export type StockOutItemForm = {
	itemId: string
	quantity: number
	unitPrice?: number
}

export type CreateStockOutPayload = {
	note?: string
	date: Date | string
	projectId?: string
	items: StockOutItemForm[]
	photoUrl: File | string | null
}

export type StockOutForm = {
	date: Date
	note: string
	photoUrl: string | File | null
	projectId?: string
	items: {
		productId: string
		quantity: number
		price: number
	}[]
}

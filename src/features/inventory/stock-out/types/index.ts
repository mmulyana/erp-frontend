import { User } from '@/shared/types'

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
export type Item = {
	id: string
	stockOutId: string
	itemId: string
	quantity: number
	unitPrice: number
	totalPrice: number
	item: {
		id: string
		name: string
		photoUrl: string
	}
}
export type StockOut = {
	id: string
	date: string
	createdBy: string
	note: string | null
	projectId: string | null
	project: any | null
	user: User
	photoUrl: string | null
	items: Item[]
	_count: {
		items: number
	}
	totalPrice: number
}

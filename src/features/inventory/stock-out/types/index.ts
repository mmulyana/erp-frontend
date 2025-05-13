import { User } from '@/shared/types'
import { Item } from '../../item/types'

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

export interface StockOut {
	id: string
	date: string
	createdBy: string
	note: string | null
	projectId: string | null
	project: any | null
	user: User
	photoUrl: string | null
	items: {
		id: string
		stockOutId: string
		itemId: string
		quantity: number
		unitPrice: number
		totalPrice: number
		item: Item
	}[]
	_count: {
		items: number
	}
	totalPrice: number
}

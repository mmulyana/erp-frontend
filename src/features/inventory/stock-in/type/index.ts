import { User } from '@/shared/types'
import { Supplier } from '../../supplier/types'

export type StockInItem = {
	itemId: string
	quantity: number
	unitPrice: number
}

export type CreateStockInPayload = {
	referenceNumber?: string
	supplierId?: string
	note?: string
	date: Date | string
	items: StockInItem[]
	photoUrl?: File | null | string
}

export type Item = {
	id: string
	stockInId: string
	totalPrice: number
	itemId: string
	item: {
		id: string
		name: string
		photoUrl: string
	}
	quantity: number
	unitPrice: number
}

export type StockIn = {
	id: string
	createdBy: string
	createdAt: string
	date: string
	items: Item[]
	note?: string
	referenceNumber?: string
	supplier: Supplier
	totalPrice: number
	user: User
	_count: {
		items: number
	}
}

export type StockInForm = {
	date: Date
	referenceNumber: string
	supplierId: string
	note: string
	photoUrl: string | File | null
	items: {
		itemId: string
		quantity: number
		unitPrice: number
	}[]
}

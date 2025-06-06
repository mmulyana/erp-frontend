import { Inventory } from '@/shared/types/api'

export type Location = {
	id: string
	name: string
	createdAt: string
	_count: {
		inventories: number
	}
}
export type LocationDetail = Location & {
	inventories: Inventory[]
}

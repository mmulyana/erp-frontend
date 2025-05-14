import { Item } from '../../item/types'

export type Location = {
	id: string
	name: string
	createdAt: string
	_count: {
		inventories: number
	}
}
export type LocationDetail = Location & {
	inventories: Item[]
}

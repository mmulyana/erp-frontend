import { BadgeOption, selectOption } from '@/shared/types'

export const statusItem: BadgeOption[] = [
	{
		color: '#D52B42',
		label: 'Habis',
		value: 'OutOfStock',
	},
	{
		color: '#EE682F',
		label: 'Hampir habis',
		value: 'LowStock',
	},
	{
		color: '#47AF97',
		label: 'Tersedia',
		value: 'Available',
	},
]


export const statusOption: selectOption[] = [
	{
		label: 'Habis',
		value: 'OutOfStock',
	},
	{
		label: 'Hampir habis',
		value: 'LowStock',
	},
	{
		label: 'Tersedia',
		value: 'Available',
	},
]
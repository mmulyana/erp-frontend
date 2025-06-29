import { StatusItem, StatusObject } from '@/shared/types'

export const months: StatusItem[] = [
	{
		value: 0,
		name: 'Januari',
	},
	{
		value: 1,
		name: 'Februari',
	},
	{
		value: 2,
		name: 'Maret',
	},
	{
		value: 3,
		name: 'April',
	},
	{
		value: 4,
		name: 'Mei',
	},
	{
		value: 5,
		name: 'Juni',
	},
	{
		value: 6,
		name: 'Juli',
	},
	{
		value: 7,
		name: 'Agustus',
	},
	{
		value: 8,
		name: 'September',
	},
	{
		value: 9,
		name: 'Oktober',
	},
	{
		value: 10,
		name: 'November',
	},
	{
		value: 11,
		name: 'Desember',
	},
]

export const MONTHS_OBJ = months.reduce<StatusObject>((acc, item) => {
	acc[item.value] = item.name
	return acc
}, {})
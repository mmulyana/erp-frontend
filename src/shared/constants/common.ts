import { selectOption } from '../types'

export const maxSizeMB = 5
export const maxSize = maxSizeMB * 1024 * 1024
export const maxFiles = 10

export const options = [
	{
		id: 'daily',
		name: 'Harian',
		description: 'Pegawai gaji harian',
	},
	{
		id: 'monthly',
		name: 'Bulanan',
		description: 'Staf perusahaan',
	},
]

export const activeOption: selectOption[] = [
	{
		label: 'Aktif',
		value: 'true',
	},
	{
		label: 'Nonaktif',
		value: 'false',
	},
]

export const educationOption: selectOption[] = [
	{
		label: 'SD',
		value: 'sd',
	},
	{
		label: 'SMP',
		value: 'smp',
	},
	{
		label: 'SMA',
		value: 'sma',
	},
	{
		label: 'S1',
		value: 's1',
	},
	{
		label: 'S2',
		value: 's2',
	},
	{
		label: 'S3',
		value: 's3',
	},
]

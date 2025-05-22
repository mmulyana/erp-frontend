import { ProjectPriority, ProjectStatus } from '@/shared/types/api'
import { BadgeOption, selectOption } from '@/shared/types'

export const reportTypes = [
	'Harian',
	'Mingguan',
	'Progress',
	'Kendala',
	'Kecelakaan',
	'Lain-lain',
]

export const warningTypes = [reportTypes[3], reportTypes[4]]

export const statusBadges: BadgeOption[] = [
	{
		color: '#565659',
		label: 'Blm dimulai',
		value: ProjectStatus.NOT_STARTED,
	},
	{
		color: '#D52B61',
		label: 'Penawaran',
		value: ProjectStatus.OFFERING,
	},
	{
		color: '#2B5BD5',
		label: 'Sedang dikerjakan',
		value: ProjectStatus.DOING,
	},
	{
		color: '#27B5E9',
		label: 'Penagihan',
		value: ProjectStatus.BILLING,
	},
	{
		color: '#47AF97',
		label: 'Selesai',
		value: ProjectStatus.DONE,
	},
]

export const priorityOption: selectOption[] = [
	{
		label: 'Rendah',
		value: ProjectPriority.LOW,
	},
	{
		label: 'Menengah',
		value: ProjectPriority.MEDIUM,
	},
	{
		label: 'Tinggi',
		value: ProjectPriority.HIGH,
	},
]

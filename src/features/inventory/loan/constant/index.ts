import { LoanStatus } from '@/shared/types/api'
import { BadgeOption } from '@/shared/types'

export const statusLoan: BadgeOption[] = [
	{
		color: '#D52B42',
		label: 'Dipinjam',
		value: LoanStatus.LOANED,
	},
	{
		color: '#EE682F',
		label: 'Belum lengkap',
		value: LoanStatus.PARTIAL_RETURNED,
	},
	{
		color: '#475DEF',
		label: 'Dikembalikan',
		value: LoanStatus.RETURNED,
	},
]

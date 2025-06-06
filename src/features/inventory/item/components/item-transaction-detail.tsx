import { id as ind } from 'date-fns/locale'
import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import StatusBadge from '@/shared/components/common/status-badge'
import { Card } from '@/shared/components/ui/card'
import { StockLedger } from '@/shared/types/api'
import { paths } from '@/shared/constants/paths'
import { BadgeOption } from '@/shared/types'

export const statusLoan: BadgeOption[] = [
	{
		color: '#D52B42',
		label: 'Dipinjam',
		value: 'LOAN',
	},
	{
		color: '#475DEF',
		label: 'Dikembalikan',
		value: 'RETURNED',
	},
]

type Props = {
	variant: 'STOCK_IN' | 'STOCK_OUT' | 'LOAN'
	data?: StockLedger
}

const types = ['RETURNED', 'LOAN']

export default function ItemTransactionDetail({ data }: Props) {
	if (!data) return null

	const { quantity, date, note, referenceId, type } = data

	const hrefs = {
		STOCK_IN: paths.inventoryStockIn,
		STOCK_OUT: paths.inventoryStockOut,
		LOAN: paths.inventoryStockLoan,
		RETURNED: paths.inventoryStockLoan,
	}

	return (
		<Card className='p-6 grid grid-cols-1 md:grid-cols-2 relative pb-14 md:pb-6'>
			<div className='space-y-2 w-full md:w-[280px]'>
				{types.includes(type) && (
					<div className='flex justify-between items-center gap-2'>
						<p className='text-ink-primary/50 text-sm'>Status</p>

						<StatusBadge options={statusLoan} value={type} />
					</div>
				)}
				<div className='flex justify-between items-center gap-2'>
					<p className='text-ink-primary/50'>Tanggal</p>
					<p className='text-ink-primary'>
						{format(new Date(date), 'PPP', { locale: ind })}
					</p>
				</div>
				<div className='flex justify-between items-center gap-2'>
					<p className='text-ink-primary/50'>Kuantitas</p>
					<p className='text-ink-primary'>{quantity}</p>
				</div>
				{note && (
					<div>
						<p className='text-ink-primary/50 text-sm'>Catatan</p>
						<p className='text-ink-primary'>{note}</p>
					</div>
				)}
			</div>

			<Link
				to={`${hrefs[type]}/${referenceId}`}
				className='flex items-center gap-2 absolute top-[calc(100%-40px)] md:top-4 right-4'
			>
				<span className='px-0.5'>Lihat transaksi</span>
				<ExternalLink size={18} />
			</Link>
		</Card>
	)
}

import CreatedSelect from '@/shared/components/common/select/created-select'
import SortButton from '@/shared/components/common/sort-button'
import { SimplePagination } from '@/shared/components/common/data-table/component'
import { usePagination } from '@/shared/hooks/use-pagination'
import { selectOption } from '@/shared/types'

import ItemTransactionDetail from './item-transaction-detail'
import { useLedgers } from '../../ledger/api/use-ledgers'

const dateOptions: selectOption[] = [
	{
		label: 'Tanggal (Terbaru)',
		value: 'date:asc',
	},
	{
		label: 'Tanggal (Terlama)',
		value: 'date:desc',
	},
]

export default function ItemTransaction({
	id,
	variant,
}: {
	id?: string
	variant?: 'STOCK_IN' | 'STOCK_OUT' | 'LOAN'
}) {
	const { limit, page, q, sortBy, sortOrder } = usePagination()
	const { data } = useLedgers({
		limit,
		page,
		itemId: id,
		search: q,
		sortBy,
		sortOrder,
		type: variant,
	})

	const titles = {
		STOCK_IN: 'Stok Masuk',
		STOCK_OUT: 'Stok Keluar',
		LOAN: 'Peminjaman',
	}

	return (
		<div className='pt-6 space-y-6'>
			<div className='flex justify-between items-start md:items-center'>
				<div className='flex gap-2 items-center'>
					<p className='text-ink-secondary font-medium'>
						{titles[variant || 'STOCK_IN']}
					</p>
					<div className='bg-[#e3e3e3] rounded-md px-2 py-0.5'>
						<p className='text-xs text-brand font-medium'>{data?.data.total}</p>
					</div>
				</div>

				<div className='flex gap-2 items-center flex-wrap justify-end md:justify-between'>
					<SortButton>
						<CreatedSelect options={dateOptions} />
					</SortButton>
				</div>
			</div>
			<SimplePagination totalPages={data?.data.total_pages || 0}>
				<div className='space-y-6 pr-2'>
					{data?.data.data?.map((i) => (
						<ItemTransactionDetail
							key={i.id}
							variant={variant || 'STOCK_IN'}
							data={i}
						/>
					))}
				</div>
			</SimplePagination>
		</div>
	)
}

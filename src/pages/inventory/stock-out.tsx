import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

import TableStockOut from '@/features/inventory/stock-out/components/table-stock-out'
import { useStockOuts } from '@/features/inventory/stock-out/api/use-stock-outs'

import { Pagination } from '@/shared/components/common/data-table/component'
import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import { buttonVariants } from '@/shared/components/ui/button'
import { DefaultLayout } from '@/shared/layout/default-layout'
import { usePagination } from '@/shared/hooks/use-pagination'
import SearchV3 from '@/shared/components/common/search-v3'
import { paths } from '@/shared/constants/paths'

export default function StockOut() {
	const { page, limit, q } = usePagination()

	const { data } = useStockOuts({
		limit,
		page,
		search: q,
	})
	console.log('data', data)

	return (
		<DefaultLayout module='inventory' className='space-y-6'>
			<div className='flex justify-between items-center'>
				<div>
					<p className='text-ink-primary font-medium leading-none mb-2'>
						Stok Keluar
					</p>
					<p className='text-ink-primary/50 leading-none'>
						Kelola data stok keluar
					</p>
				</div>
				<Link to={paths.inventoryStockOutNew} className={buttonVariants()}>
					<Plus size={16} className='stroke-white' />
					<span className='px-0.5'>Tambah</span>
				</Link>
			</div>
			<div className='p-6 bg-white rounded-xl border border-border space-y-6'>
				<div className='flex justify-between items-center'>
					<SearchV3 />
					<div className='flex gap-4 items-center'>
						<FilterButton></FilterButton>
						<SortButton></SortButton>
					</div>
				</div>
				<TableStockOut data={data?.data.data || []} />
				<Pagination
					totalItems={data?.data.total || 0}
					totalPages={data?.data.total_pages || 0}
				/>
			</div>
		</DefaultLayout>
	)
}

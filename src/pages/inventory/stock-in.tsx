import { useStockIns } from '@/features/inventory/stock-in/api/use-stock-ins'
import StockInTotal from '@/features/inventory/stock-in/components/stock-in-total'
import TableStockIn from '@/features/inventory/stock-in/components/table-stock-in'
import { Pagination } from '@/shared/components/common/data-table/component'
import FilterButton from '@/shared/components/common/filter-button'
import HeadPage from '@/shared/components/common/head-page'
import SearchV3 from '@/shared/components/common/search-v3'
import SortButton from '@/shared/components/common/sort-button'
import { buttonVariants } from '@/shared/components/ui/button'
import { paths } from '@/shared/constants/paths'
import { usePagination } from '@/shared/hooks/use-pagination'
import { DefaultLayout } from '@/shared/layout/default-layout'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function StockIn() {
	const { page, limit, q } = usePagination()

	const { data } = useStockIns({
		limit,
		page,
		search: q,
	})

	return (
		<DefaultLayout module='inventory' className='space-y-6'>
			<StockInTotal />
			<HeadPage
				title='Stok Masuk'
				subtitle='Kelola data stok masuk'
				url={paths.inventoryStockInNew}
			/>
			<div className='p-6 bg-white rounded-xl border border-border space-y-6'>
				<div className='flex justify-between items-center'>
					<SearchV3 />
					<div className='flex gap-4 items-center'>
						<FilterButton></FilterButton>
						<SortButton></SortButton>
					</div>
				</div>
				<TableStockIn data={data?.data.data || []} />
				<Pagination
					totalItems={data?.data.total || 0}
					totalPages={data?.data.total_pages || 0}
				/>
			</div>
		</DefaultLayout>
	)
}

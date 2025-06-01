import { parseAsString, useQueryStates } from 'nuqs'

import StockOutTotal from '@/features/inventory/stock-out/components/stock-out-total'
import TableStockOut from '@/features/inventory/stock-out/components/table-stock-out'
import ProjectCombobox from '@/features/projects/project/components/project-combobox'
import UserCombobox from '@/features/user/components/user-combobox'
import { useStockOuts } from '@/features/inventory/stock-out/api/use-stock-outs'

import CreatedSelect from '@/shared/components/common/select/created-select'
import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import SearchV3 from '@/shared/components/common/search-v3'
import HeadPage from '@/shared/components/common/head-page'

import { Pagination } from '@/shared/components/common/data-table/component'
import { DefaultLayout } from '@/shared/layout/default-layout'
import { usePagination } from '@/shared/hooks/use-pagination'
import { paths } from '@/shared/constants/paths'
import { useHasQueryValue } from '@/shared/hooks/use-has-query'
import FilterReset from '@/shared/components/common/filter-reset'

export default function StockOut() {
	const [query, setQuery] = useQueryStates({
		projectId: parseAsString.withDefault(''),
		userId: parseAsString.withDefault(''),
		sort: parseAsString.withDefault(''),
	})
	const { page, limit, q, sortBy, sortOrder } = usePagination()

	const { data } = useStockOuts({
		limit,
		page,
		search: q,
		createdBy: query.userId,
		projectId: query.projectId,
		sortBy,
		sortOrder,
	})

	const hasQuery = useHasQueryValue(query)

	return (
		<DefaultLayout module='inventory' className='space-y-6'>
			<StockOutTotal />
			<HeadPage
				title='Stok Keluar'
				subtitle='Kelola data stok keluar'
				url={paths.inventoryStockOutNew}
			/>
			<div className='p-6 bg-white rounded-xl border border-border space-y-6'>
				<div className='flex items-center gap-4'>
					<SearchV3 />
					<FilterReset
						show={hasQuery}
						onClick={() =>
							setQuery({
								sort: null,
								userId: null,
								projectId: null,
							})
						}
					/>
					<FilterButton style={{ trigger: 'ml-0 md:ml-auto' }}>
						<div>
							<p className='text-sm text-ink-primary font-medium'>Proyek</p>
							<ProjectCombobox
								defaultValue={query.projectId}
								onSelect={(val) => setQuery({ projectId: val })}
							/>
						</div>
						<div>
							<p className='text-sm text-ink-primary font-medium'>
								Dibuat oleh
							</p>
							<UserCombobox
								defaultValue={query.userId}
								onSelect={(val) => setQuery({ userId: val })}
							/>
						</div>
					</FilterButton>
					<SortButton>
						<CreatedSelect />
					</SortButton>
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

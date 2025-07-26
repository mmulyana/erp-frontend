import { parseAsString, useQueryStates } from 'nuqs'

import SupplierCombobox from '@/features/inventory/supplier/components/supplier-combobox'
import StockInTotal from '@/features/inventory/stock-in/components/stock-in-total'
import TableStockIn from '@/features/inventory/stock-in/components/table-stock-in'
import { useStockIns } from '@/features/inventory/stock-in/api/use-stock-ins'

import CreatedSelect from '@/shared/components/common/select/created-select'
import FilterButton from '@/shared/components/common/filter-button'
import UserCombobox from '@/features/user/components/user-combobox'
import FilterReset from '@/shared/components/common/filter-reset'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'
import SearchV3 from '@/shared/components/common/search-v3'

import { Pagination } from '@/shared/components/common/data-table/component'
import { useHasPermission } from '@/shared/hooks/use-has-permission'
import { useHasQueryValue } from '@/shared/hooks/use-has-query'
import { DefaultLayout } from '@/shared/layout/default-layout'
import { usePagination } from '@/shared/hooks/use-pagination'
import { permissions } from '@/shared/constants/permissions'
import { paths } from '@/shared/constants/paths'

export default function StockIn() {
	const [query, setQuery] = useQueryStates({
		supplierId: parseAsString.withDefault(''),
		sort: parseAsString.withDefault(''),
		createdBy: parseAsString.withDefault(''),
	})

	const { page, limit, q, sortBy, sortOrder } = usePagination()

	const { data } = useStockIns({
		limit,
		page,
		search: q,
		supplierId: query.supplierId,
		sortBy,
		sortOrder,
	})

	const hasQuery = useHasQueryValue(query)

	const canCreate = useHasPermission([permissions.transaction_create])

	return (
		<DefaultLayout module='inventory' className='space-y-6'>
			<StockInTotal />
			<HeadPage
				title='Stok Masuk'
				subtitle='Kelola data stok masuk'
				url={paths.inventoryStockInNew}
				hideAction={!canCreate}
			/>
			<div className='p-6 bg-white rounded-xl border border-border space-y-6'>
				<div className='flex gap-4 items-center'>
					<SearchV3 />
					<FilterReset
						show={hasQuery}
						onClick={() =>
							setQuery({
								sort: null,
								supplierId: null,
								createdBy: null,
							})
						}
					/>
					<FilterButton style={{ trigger: 'ml-0 md:ml-auto' }}>
						<div className='space-y-1'>
							<p className='text-ink-primary/50'>Supplier</p>
							<SupplierCombobox
								defaultValue={query.supplierId}
								onSelect={(val) =>
									setQuery({
										supplierId: val,
									})
								}
							/>
						</div>
						<div className='space-y-1'>
							<p className='text-ink-primary/50'>Dibuat Oleh</p>
							<UserCombobox
								defaultValue={query.createdBy}
								onSelect={(val) =>
									setQuery({
										createdBy: val,
									})
								}
							/>
						</div>
					</FilterButton>
					<SortButton>
						<CreatedSelect />
					</SortButton>
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

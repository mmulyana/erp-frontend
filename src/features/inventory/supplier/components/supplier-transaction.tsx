import { parseAsString, useQueryStates } from 'nuqs'

import FilterButton from '@/shared/components/common/filter-button'
import CardStockIn from '@/shared/components/common/card-stock-in'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { usePagination } from '@/shared/hooks/use-pagination'

import { useStockIns } from '../../stock-in/api/use-stock-ins'
import UserCombobox from '@/features/user/components/user-combobox'
import { Pagination } from '@/shared/components/common/data-table/component'
import SortButton from '@/shared/components/common/sort-button'
import CreatedSelect from '@/shared/components/common/select/created-select'

export default function SupplierTransaction({ id }: { id?: string }) {
	const [query, setQuery] = useQueryStates({
		createdBy: parseAsString.withDefault(''),
	})
	const { limit, page, sortBy, sortOrder } = usePagination()

	const { data } = useStockIns({
		limit,
		createdBy: query.createdBy,
		page,
		sortBy,
		sortOrder,
		supplierId: id,
	})

	return (
		<div className='pt-6'>
			<div className='flex gap-2 items-center'>
				<div className='flex gap-2 items-center'>
					<p className='text-ink-secondary font-medium'>Transaksi</p>
					<div className='bg-[#e3e3e3] rounded-full px-2.5 py-0.5'>
						<p className='text-ink-primary font-semibold leading-none'>
							{data?.data.data.length}
						</p>
					</div>
				</div>

				<FilterButton style={{ trigger: 'ml-0 md:ml-auto' }}>
					<UserCombobox
						defaultValue={query.createdBy}
						onSelect={(val) => setQuery({ createdBy: val })}
					/>
				</FilterButton>
				<SortButton>
					<CreatedSelect />
				</SortButton>
			</div>
			<div className='space-y-4 pt-4'>
				{data?.data.data.map((i) => (
					<CardStockIn key={i.id} data={i} />
				))}
			</div>
			<Pagination
				totalItems={data?.data.total || 0}
				totalPages={data?.data.total_pages || 0}
			/>
		</div>
	)
}

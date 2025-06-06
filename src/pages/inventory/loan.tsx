import { parseAsString, useQueryStates } from 'nuqs'

import ProjectCombobox from '@/features/projects/project/components/project-combobox'
import ItemCombobox from '@/features/inventory/item/components/item-combobox'
import TableLoan from '@/features/inventory/loan/components/table-loan'
import PieLoan from '@/features/inventory/loan/components/pie-loan'
import UserCombobox from '@/features/user/components/user-combobox'
import { statusLoan } from '@/features/inventory/loan/constant'

import CreatedSelect from '@/shared/components/common/select/created-select'
import BaseSelect from '@/shared/components/common/select/base-select'
import FilterButton from '@/shared/components/common/filter-button'
import FilterReset from '@/shared/components/common/filter-reset'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'
import SearchV3 from '@/shared/components/common/search-v3'

import { useHasPermission } from '@/shared/hooks/use-has-permission'
import { useHasQueryValue } from '@/shared/hooks/use-has-query'
import { DefaultLayout } from '@/shared/layout/default-layout'
import { permissions } from '@/shared/constants/permissions'
import { paths } from '@/shared/constants/paths'

export default function Loan() {
	const [query, setQuery] = useQueryStates({
		inventoryId: parseAsString.withDefault(''),
		projectId: parseAsString.withDefault(''),
		userId: parseAsString.withDefault(''),
		sort: parseAsString.withDefault(''),
		status: parseAsString.withDefault(''),
	})

	const hasQuery = useHasQueryValue(query)
	const canCreate = useHasPermission([permissions.transaction_create])

	return (
		<DefaultLayout module='inventory' className='space-y-6'>
			<div className='h-fit w-[380px] max-w-full'>
				<PieLoan />
			</div>
			<HeadPage
				title='Peminjaman'
				subtitle='Kelola data peminjaman barang'
				url={paths.inventoryStockLoanNew}
				hideAction={!canCreate}
			/>
			<div className='p-6 rounded-xl bg-white border border-border space-y-6'>
				<div className='flex gap-4 items-center'>
					<SearchV3 />
					<FilterReset
						show={hasQuery}
						onClick={() =>
							setQuery({
								sort: null,
								inventoryId: null,
								projectId: null,
								userId: null,
								status: null,
							})
						}
					/>

					<FilterButton
						style={{
							trigger: 'ml-0 md:ml-auto',
						}}
					>
						<div>
							<p className='text-sm text-ink-primary font-medium'>Barang</p>
							<ItemCombobox
								className='bg-white'
								defaultValue={query.inventoryId}
								onSelect={(val) => setQuery({ inventoryId: val })}
							/>
						</div>
						<div>
							<p className='text-sm text-ink-primary font-medium'>Proyek</p>
							<ProjectCombobox
								className='bg-white'
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
								className='bg-white'
							/>
						</div>

						<BaseSelect
							label='Status'
							options={statusLoan}
							urlName='status'
							defaultValue={query.status}
						/>
					</FilterButton>
					<SortButton>
						<CreatedSelect />
					</SortButton>
				</div>
				<TableLoan />
			</div>
		</DefaultLayout>
	)
}

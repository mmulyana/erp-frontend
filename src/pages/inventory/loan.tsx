import { parseAsString, useQueryStates } from 'nuqs'

import ProjectCombobox from '@/features/projects/project/components/project-combobox'
import TableLoan from '@/features/inventory/loan/components/table-loan'
import PieLoan from '@/features/inventory/loan/components/pie-loan'
import UserCombobox from '@/features/user/components/user-combobox'

import CreatedSelect from '@/shared/components/common/select/created-select'
import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'
import SearchV3 from '@/shared/components/common/search-v3'

import { DefaultLayout } from '@/shared/layout/default-layout'
import { paths } from '@/shared/constants/paths'

export default function Loan() {
	const [query, setQuery] = useQueryStates({
		projectId: parseAsString.withDefault(''),
		userId: parseAsString.withDefault(''),
	})

	return (
		<DefaultLayout module='inventory' className='space-y-6'>
			<div className='h-fit w-[380px] max-w-full'>
				<PieLoan />
			</div>
			<HeadPage
				title='Peminjaman'
				subtitle='Kelola data peminjaman barang'
				url={paths.inventoryStockLoanNew}
			/>
			<div className='p-6 rounded-xl bg-white border border-border space-y-6'>
				<div className='flex gap-2 items-center'>
					<SearchV3 />
					<FilterButton
						style={{
							trigger: 'ml-0 md:ml-auto',
						}}
					>
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
				<TableLoan />
			</div>
		</DefaultLayout>
	)
}

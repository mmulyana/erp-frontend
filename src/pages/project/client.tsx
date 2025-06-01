import { parseAsString, useQueryStates } from 'nuqs'
import { useMemo } from 'react'

import { DefaultLayout } from '@/shared/layout/default-layout'
import CreatedSelect from '@/shared/components/common/select/created-select'
import FilterButton from '@/shared/components/common/filter-button'
import FilterReset from '@/shared/components/common/filter-reset'
import SortButton from '@/shared/components/common/sort-button'
import SearchV3 from '@/shared/components/common/search-v3'
import HeadPage from '@/shared/components/common/head-page'

import CompanyCombobox from '@/features/projects/company/components/company-combobox'
import ModalAddClient from '@/features/projects/client/components/modal-add-client'
import TableClient from '@/features/projects/client/components/table-client'

export default function Client() {
	const [query, setQuery] = useQueryStates({
		companyId: parseAsString.withDefault(''),
		sortOrder: parseAsString.withDefault(''),
		sortBy: parseAsString.withDefault(''),
	})

	const hasQueryValue = useMemo(() => {
		return Object.values(query).some(
			(val) => val !== '' && val !== undefined && val !== null
		)
	}, [query])

	return (
		<DefaultLayout className='space-y-6' module='project'>
			<HeadPage
				title='Klien'
				subtitle='Kelola data klien'
				action={<ModalAddClient />}
			/>
			<div className='p-6 rounded-xl bg-white border border-border space-y-6'>
				<div className='flex items-center gap-4 flex-wrap'>
					<SearchV3 />
					<FilterReset
						show={hasQueryValue}
						onClick={() =>
							setQuery({
								companyId: null,
								sortOrder: null,
								sortBy: null,
							})
						}
					/>

					<FilterButton style={{ trigger: 'ml-0 md:ml-auto' }}>
						<div className='space-y-2'>
							<p className='text-ink-primary text-sm font-medium'>Perusahaan</p>
							<CompanyCombobox
								defaultValue={query.companyId}
								onSelect={(val) => setQuery({ companyId: val })}
							/>
						</div>
					</FilterButton>
					<SortButton>
						<CreatedSelect />
					</SortButton>
				</div>
				<TableClient />
			</div>
		</DefaultLayout>
	)
}

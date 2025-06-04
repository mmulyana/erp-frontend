import SearchV3 from '@/shared/components/common/search-v3'
import HeadPage from '@/shared/components/common/head-page'

import ModalAddOvertime from './modal-add-overtime'
import TableOvertime from './table-overtime'
import FilterEmployee from '@/features/hris/employee/components/filter-employee'
import ProjectCombobox from '@/features/projects/project/components/project-combobox'
import { parseAsString, useQueryStates } from 'nuqs'
import SortButton from '@/shared/components/common/sort-button'
import CreatedSelect from '@/shared/components/common/select/created-select'
import FilterReset from '@/shared/components/common/filter-reset'
import { useHasQueryValue } from '@/shared/hooks/use-has-query'

export default function SectionOvertime() {
	const [query, setQuery] = useQueryStates({
		projectId: parseAsString.withDefault(''),
		position: parseAsString.withDefault(''),
		sort: parseAsString.withDefault(''),
	})

	const hasQuery = useHasQueryValue(query)

	return (
		<div className='w-full space-y-6'>
			<HeadPage
				title='Lembur'
				subtitle='Kelola lemburan pegawai harian'
				action={<ModalAddOvertime />}
			/>
			<div className='p-6 rounded-xl border border-border bg-white space-y-6'>
				<div className='flex gap-4 items-center'>
					<SearchV3 />
					<FilterReset
						show={hasQuery}
						onClick={() =>
							setQuery({
								position: null,
								projectId: null,
								sort: null,
							})
						}
					/>
					<FilterEmployee hideFilter={['active', 'lastEdu']}>
						<div className='space-y-2'>
							<p className='text-sm text-ink-primary font-medium'>Proyek</p>
							<ProjectCombobox
								className='bg-white'
								defaultValue={query.projectId}
								onSelect={(val) =>
									setQuery({
										projectId: val,
									})
								}
							/>
						</div>
					</FilterEmployee>
					<SortButton>
						<CreatedSelect />
					</SortButton>
				</div>
				<TableOvertime />
			</div>
		</div>
	)
}

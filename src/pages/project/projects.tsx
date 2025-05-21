import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'
import { paths } from '@/shared/constants/paths'

import TableProject from '@/features/projects/project/components/table-project'
import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'
import ProjectStatus from '@/features/projects/project/components/project-status'
import BaseSelect from '@/shared/components/common/select/base-select'
import { selectOption } from '@/shared/types'
import CreatedSelect from '@/shared/components/common/select/created-select'

const statusOptions: selectOption[] = [
	{
		label: 'Blm dimulai',
		value: 'NOT_STARTED',
	},
	{
		label: 'Penawaran',
		value: 'OFFERING',
	},
	{
		label: 'Sedang dikerjakan',
		value: 'DOING',
	},
	{
		label: 'Penagihan',
		value: 'BILLING',
	},
	{
		label: 'Selesai',
		value: 'Done',
	},
]

const priorityOptions: selectOption[] = [
	{
		label: 'Rendah',
		value: 'LOW',
	},
	{
		label: 'Menengah',
		value: 'MEDIUM',
	},
	{
		label: 'Tinggi',
		value: 'HIGH',
	},
]

export default function Projects() {
	return (
		<DefaultLayout className='space-y-6' module='project'>
			<ProjectStatus variant='compact' />
			<HeadPage
				title='Proyek'
				subtitle='Kelola data proyek dalam perusahaan'
				url={paths.projectNew}
			/>
			<div className='p-6 rounded-xl bg-white border border-border space-y-6'>
				<div className='flex justify-between items-center'>
					<SearchV3 />
					<div className='flex gap-4 items-center'>
						<FilterButton >
							<BaseSelect
								defaultValue=''
								urlName='status'
								options={statusOptions}
								label='Status'
							/>
							<BaseSelect
								defaultValue=''
								urlName='priority'
								options={priorityOptions}
								label='Prioritas'
							/>
						</FilterButton>
						<SortButton>
							<CreatedSelect />
						</SortButton>
					</div>
				</div>
				<TableProject />
			</div>
		</DefaultLayout>
	)
}

import { parseAsString, useQueryStates } from 'nuqs'
import { useMemo } from 'react'

import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'
import { paths } from '@/shared/constants/paths'

import ClientCombobox from '@/features/projects/client/components/client-combobox'
import ProjectStatus from '@/features/projects/project/components/project-status'
import TableProject from '@/features/projects/project/components/table-project'
import UserCombobox from '@/features/user/components/user-combobox'

import CreatedSelect from '@/shared/components/common/select/created-select'
import BaseSelect from '@/shared/components/common/select/base-select'
import FilterButton from '@/shared/components/common/filter-button'
import FilterReset from '@/shared/components/common/filter-reset'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'
import { permissions } from '@/shared/constants/permissions'
import { useHasPermission } from '@/shared/hooks/use-has-permission'
import { selectOption } from '@/shared/types'

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
		value: 'DONE',
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
	const [query, setQuery] = useQueryStates({
		priority: parseAsString.withDefault(''),
		leadId: parseAsString.withDefault(''),
		clientId: parseAsString.withDefault(''),
		status: parseAsString.withDefault(''),
	})

	const hasQueryValue = useMemo(() => {
		return Object.values(query).some(
			(val) => val !== '' && val !== undefined && val !== null
		)
	}, [query])

	const canCreate = useHasPermission([permissions.project_create])

	return (
		<DefaultLayout className='space-y-6' module='project'>
			<ProjectStatus variant='compact' />
			<HeadPage
				title='Proyek'
				subtitle='Kelola data proyek dalam perusahaan'
				url={paths.projectNew}
				actionLabel='Tambah Proyek'
				hideAction={!canCreate}
			/>
			<div className='p-6 rounded-xl bg-white border border-border space-y-6'>
				<div className='flex w-full items-center gap-4'>
					<SearchV3 />
					<FilterReset
						show={hasQueryValue}
						onClick={() =>
							setQuery({
								priority: null,
								clientId: null,
								leadId: null,
								status: null,
							})
						}
					/>

					<FilterButton
						style={{
							trigger: 'ml-0 md:ml-auto',
						}}
					>
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
						<div>
							<p className='text-ink-primary font-medium text-sm'>
								Penanggung jawab
							</p>
							<UserCombobox
								defaultValue={query.leadId}
								onSelect={(val) =>
									setQuery({
										leadId: val,
									})
								}
							/>
						</div>
						<div>
							<p className='text-ink-primary font-medium text-sm'>Klien</p>
							<ClientCombobox
								defaultValue={query.clientId}
								onSelect={(val) =>
									setQuery({
										clientId: val,
									})
								}
								className='bg-white'
							/>
						</div>
					</FilterButton>
					<SortButton>
						<CreatedSelect />
					</SortButton>
				</div>
				<TableProject />
			</div>
		</DefaultLayout>
	)
}

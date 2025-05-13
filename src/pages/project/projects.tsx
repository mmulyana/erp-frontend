import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'
import { paths } from '@/shared/constants/paths'

import TableProject from '@/features/projects/project/components/table-project'
import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'

export default function Projects() {
	return (
		<DefaultLayout className='space-y-6' module='project'>
			<HeadPage
				title='Proyek'
				subtitle='Kelola data proyek dalam perusahaan'
				url={paths.projectNew}
			/>
			<div className='p-6 rounded-xl bg-white border border-border space-y-6'>
				<div className='flex justify-between items-center'>
					<SearchV3 />
					<div className='flex gap-4 items-center'>
						<FilterButton></FilterButton>
						<SortButton></SortButton>
					</div>
				</div>
				<TableProject />
			</div>
		</DefaultLayout>
	)
}

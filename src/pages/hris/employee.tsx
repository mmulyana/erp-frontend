import { DefaultLayout } from '@/shared/layout/default-layout'
import HeadPage from '@/shared/components/common/head-page'
import { paths } from '@/shared/constants/paths'
import TableEmployee from '@/features/hris/employee/components/table-employee'
import TotalEmployee from '@/features/hris/employee/components/total-employee'
import LastEducation from '@/features/hris/employee/components/last-education'

export default function Employee() {
	return (
		<DefaultLayout module='hris' className='space-y-6'>
			<div className='flex gap-6 flex-wrap'>
				<TotalEmployee variant='compact' />
				<LastEducation variant='compact' />
			</div>
			<HeadPage
				title='Pegawai'
				subtitle='Kelola data seluruh pegawai di perusahaan'
				url={paths.hrisMasterdataEmployeeCreate}
			/>
			<TableEmployee />
		</DefaultLayout>
	)
}

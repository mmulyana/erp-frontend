import HeadPage from '@/shared/components/common/head-page'
import { DefaultLayout } from '@/shared/layout/default-layout'
import { paths } from '@/shared/constants/paths'

import TableEmployee from '@/features/hris/employee/components/table-employee'
import TotalEmployee from '@/features/hris/employee/components/total-employee'
import LastEducation from '@/features/hris/employee/components/last-education'
import { useHasPermission } from '@/shared/hooks/use-has-permission'
import { permissions } from '@/shared/constants/permissions'

export default function Employee() {
	const canCreate = useHasPermission([permissions.employee_create])

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
				hideAction={!canCreate}
			/>
			<TableEmployee />
		</DefaultLayout>
	)
}

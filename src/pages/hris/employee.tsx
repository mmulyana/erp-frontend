import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'

import TableEmployee from '@/features/hris/employee/components/table-employee'

import { paths } from '@/shared/constants/paths'
import { buttonVariants } from '@/shared/components/ui/button'

export default function Employee() {
	return (
		<DefaultLayout className='px-0 pt-12' module='hris'>
			<div className='flex justify-between items-center p-6'>
				<SearchV3 />
				<Link
					to={paths.hrisMasterdataEmployeeCreate}
					className={buttonVariants({
						className: 'gap-2',
						variant: 'default',
					})}
				>
					<Plus strokeWidth={2} size={16} className='text-white' />
					<span className='px-0.5'>Tambah Pegawai</span>
				</Link>
			</div>
			<TableEmployee />
		</DefaultLayout>
	)
}

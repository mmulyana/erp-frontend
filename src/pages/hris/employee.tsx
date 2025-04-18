import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

import { HrisLayout } from '@/shared/layout/hris-layout'
import SearchV3 from '@/shared/components/common/search-v3'

import TableEmployee from '@/features/hris/employee/components/table-employee'

import { paths } from '@/shared/constants/paths'
import { buttonVariants } from '@/shared/components/ui/button'

export default function Employee() {
	return (
		<HrisLayout className='px-0 pt-12'>
			<div className='flex justify-between items-center p-6'>
				<SearchV3 />
				<Link
					to={paths.hrisMasterDataEmployeeCreate}
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
		</HrisLayout>
	)
}

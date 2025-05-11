import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

import { DefaultLayout } from '@/shared/layout/default-layout'

import TableEmployee from '@/features/hris/employee/components/table-employee'

import { paths } from '@/shared/constants/paths'
import { buttonVariants } from '@/shared/components/ui/button'
import TotalEmployee from '@/features/hris/employee/components/total-employee'
import LastEducation from '@/features/hris/employee/components/last-education'

export default function Employee() {
	return (
		<DefaultLayout module='hris'>
			<div className='flex gap-6 flex-wrap'>
				<TotalEmployee variant='compact' />
				<LastEducation variant='compact' />
			</div>
			<div className='flex justify-between items-center py-6'>
				<div>
					<p className='text-ink-primary leading-none mb-2'>Pegawai</p>
					<p className='text-ink-primary/50 leading-none'>
						Kelola data seluruh pegawai di perusahaan
					</p>
				</div>
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

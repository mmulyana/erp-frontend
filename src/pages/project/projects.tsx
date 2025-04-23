import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

import { DefaultLayout } from '@/shared/layout/default-layout'
import { buttonVariants } from '@/shared/components/ui/button'
import SearchV3 from '@/shared/components/common/search-v3'
import { paths } from '@/shared/constants/paths'

export default function Projects() {
	return (
		<DefaultLayout className='px-0 pt-12' module='project'>
			<div className='flex justify-between items-center p-6'>
				<SearchV3 />
				<Link
					to={paths.projectNew}
					className={buttonVariants({
						className: 'gap-2',
						variant: 'default',
					})}
				>
					<Plus strokeWidth={2} size={16} className='text-white' />
					<span className='px-0.5'>Tambah Proyek</span>
				</Link>
			</div>
		</DefaultLayout>
	)
}

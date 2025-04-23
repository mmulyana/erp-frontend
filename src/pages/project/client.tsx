import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'

import ModalDetailClient from '@/features/projects/client/components/modal-detail-client'
import ModalAddClient from '@/features/projects/client/components/modal-add-client'
import TableClient from '@/features/projects/client/components/table-client'

export default function Client() {
	return (
		<DefaultLayout className='px-0 pt-12' module='project'>
			<div className='flex justify-between items-center p-6'>
				<SearchV3 />
				<ModalAddClient />
			</div>
			<TableClient />
			<ModalDetailClient />
		</DefaultLayout>
	)
}

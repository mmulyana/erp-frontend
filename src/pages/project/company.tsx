import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'

import ModalDetailCompany from '@/features/projects/company/components/modal-detail-company'
import ModalAddCompany from '@/features/projects/company/components/modal-add-company'
import TableCompany from '@/features/projects/company/components/table-company'

export default function Company() {
	return (
		<DefaultLayout className='px-0 pt-12' module='project'>
			<div className='flex justify-between items-center p-6'>
				<SearchV3 />
				<ModalAddCompany />
			</div>
			<TableCompany />
			<ModalDetailCompany />
		</DefaultLayout>
	)
}

import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

import { DefaultLayout } from '@/shared/layout/default-layout'
import { buttonVariants } from '@/shared/components/ui/button'
import SearchV3 from '@/shared/components/common/search-v3'
import TableBrand from '@/features/inventory/brand/components/table-brand'
import ModalAddBrand from '@/features/inventory/brand/components/modal-add-brand'
import ModalDetailBrand from '@/features/inventory/brand/components/modal-detail-brand'

export default function Brand() {
	return (
		<DefaultLayout className='px-0 pt-12' module='inventory'>
			<div className='flex justify-between items-center p-6'>
				<SearchV3 />
				<ModalAddBrand />
			</div>
			<TableBrand />
			<ModalDetailBrand />
		</DefaultLayout>
	)
}

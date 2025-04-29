import { Plus } from 'lucide-react'
import { useSetAtom } from 'jotai'

import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'
import { Button } from '@/shared/components/ui/button'

import TableSupplier from '@/features/inventory/supplier/components/table-supplier'
import ModalSupplier, {
	atomModalSupplier,
} from '@/features/inventory/supplier/components/modal-supplier'

export default function Supplier() {
	const setModal = useSetAtom(atomModalSupplier)
	return (
		<DefaultLayout className='px-0 pt-12' module='inventory'>
			<div className='flex justify-between items-center p-6'>
				<SearchV3 />
				<Button
					className='gap-1'
					onClick={() => setModal({ id: '', open: true })}
				>
					<Plus strokeWidth={2} size={16} className='text-white' />
					<span className='px-0.5'>Tambah Supplier</span>
				</Button>
			</div>
			<TableSupplier />
			<ModalSupplier />
		</DefaultLayout>
	)
}

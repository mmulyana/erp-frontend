import { Plus } from 'lucide-react'
import { useSetAtom } from 'jotai'

import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import SearchV3 from '@/shared/components/common/search-v3'
import HeadPage from '@/shared/components/common/head-page'
import { DefaultLayout } from '@/shared/layout/default-layout'
import { Button } from '@/shared/components/ui/button'

import TableSupplier from '@/features/inventory/supplier/components/table-supplier'
import ModalSupplier, {
	atomModalSupplier,
} from '@/features/inventory/supplier/components/modal-supplier'

export default function Supplier() {
	const setModal = useSetAtom(atomModalSupplier)
	return (
		<DefaultLayout module='inventory' className='space-y-6'>
			<HeadPage
				title='Supplier'
				subtitle='Kelola data supplier'
				action={
					<Button
						className='gap-1'
						onClick={() => setModal({ id: '', open: true })}
					>
						<Plus strokeWidth={2} size={16} className='text-white' />
						<span className='px-0.5'>Tambah Supplier</span>
					</Button>
				}
			/>

			<div className='p-6 rounded-xl border borde-border bg-white space-y-6'>
				<div className='flex justify-between items-center'>
					<SearchV3 />
					<div className='flex gap-4 items-center'>
						<FilterButton></FilterButton>
						<SortButton></SortButton>
					</div>
				</div>
				<TableSupplier />
			</div>
			<ModalSupplier />
		</DefaultLayout>
	)
}

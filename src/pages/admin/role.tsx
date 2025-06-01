import ModalAddRole from '@/features/role/components/modal-add-role'
import TableRole from '@/features/role/components/table-role'
import HeadPage from '@/shared/components/common/head-page'
import SearchV3 from '@/shared/components/common/search-v3'
import CreatedSelect from '@/shared/components/common/select/created-select'
import SortButton from '@/shared/components/common/sort-button'
import { DefaultLayout } from '@/shared/layout/default-layout'

export default function Role() {
	return (
		<DefaultLayout module='admin' className='space-y-6'>
			<HeadPage
				title='Role'
				subtitle='Kelola role dalam sistem'
				action={<ModalAddRole />}
			/>

			<div className='p-6 rounded-xl border borde-border bg-white space-y-6'>
				<div className='flex justify-between items-center gap-4'>
					<SearchV3 />

					<SortButton style={{ trigger: 'ml-0 md:ml-auto' }}>
						<CreatedSelect />
					</SortButton>
				</div>
				<TableRole />
			</div>
		</DefaultLayout>
	)
}

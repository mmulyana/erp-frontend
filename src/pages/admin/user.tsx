import ModalAddUser from '@/features/user/components/modal-add-user'
import TableUser from '@/features/user/components/table-user'

import CreatedSelect from '@/shared/components/common/select/created-select'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'
import SearchV3 from '@/shared/components/common/search-v3'
import { DefaultLayout } from '@/shared/layout/default-layout'

export default function User() {
	return (
		<DefaultLayout module='admin' className='space-y-6'>
			<HeadPage
				title='User'
				subtitle='Kelola data user'
				action={<ModalAddUser />}
			/>

			<div className='p-6 rounded-xl border borde-border bg-white space-y-6'>
				<div className='flex justify-between items-center gap-4'>
					<SearchV3 />

					<SortButton style={{ trigger: 'ml-0 md:ml-auto' }}>
						<CreatedSelect />
					</SortButton>
				</div>
				<TableUser />
			</div>
		</DefaultLayout>
	)
}

import SearchV3 from '@/shared/components/common/search-v3'

import ModalDetailOvertime from './modal-detail-overtime'
import ModalAddOvertime from './modal-add-overtime'
import TableOvertime from './table-overtime'
import HeadPage from '@/shared/components/common/head-page'

export default function SectionOvertime() {
	return (
		<div className='w-full space-y-6'>
			<HeadPage
				title='Lembur'
				subtitle='Kelola lemburan pegawai harian'
				action={<ModalAddOvertime />}
			/>
			<div className='p-6 rounded-xl border border-border bg-white space-y-6'>
				<div className='flex justify-between items-center'>
					<div className='flex gap-4 items-center'>
						<SearchV3 />
					</div>
				</div>
				<TableOvertime />
			</div>
			<ModalDetailOvertime />
		</div>
	)
}

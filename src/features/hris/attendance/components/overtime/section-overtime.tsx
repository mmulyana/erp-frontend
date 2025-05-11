import SearchV3 from '@/shared/components/common/search-v3'

import ModalDetailOvertime from './modal-detail-overtime'
import ModalAddOvertime from './modal-add-overtime'
import TableOvertime from './table-overtime'

export default function SectionOvertime() {
	return (
		<div className='w-full space-y-6'>
			<div className='flex gap-8 lg:gap-20 items-center justify-between'>
				<div>
					<p className='text-ink-primary font-medium leading-none mb-2'>Lembur</p>
					<p className='text-ink-primary/50 leading-none'>
						Kelola lemburan pegawai harian
					</p>
				</div>

				<ModalAddOvertime />
			</div>
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

import { parseAsInteger, useQueryStates } from 'nuqs'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'

import { useCurrentDate } from '@/shared/hooks/use-current-date'
import { useDateIndex } from '@/shared/hooks/use-date-index'
import CardData from '@/shared/components/common/card-data'
import SearchV3 from '@/shared/components/common/search-v3'

import ModalDetailOvertime from './modal-detail-overtime'
import ModalAddOvertime from './modal-add-overtime'
import TableOvertime from './table-overtime'

export default function SectionOvertime() {
	const { month, date } = useCurrentDate()

	const [query] = useQueryStates({
		date: parseAsInteger.withDefault(0),
		month: parseAsInteger.withDefault(month),
	})

	const { resultDate } = useDateIndex({
		indexDate: query.date > 0 ? query.date : date,
		indexMonth: query.month,
	})

	return (
		<div className='w-full'>
			<div className='flex gap-8 lg:gap-20 items-center'>
				<div className='flex flex-col'>
					<p className='text-ink-light text-sm'>Tanggal</p>
					<p className='text-ink-secondary text-xl font-medium'>
						{format(query.date > 0 ? resultDate : new Date(), 'PPP', {
							locale: id,
						})}
					</p>
				</div>
			</div>
			<div className='flex justify-between items-center py-6'>
				<div className='flex gap-4 items-center'>
					<SearchV3 />
				</div>
				<ModalAddOvertime />
			</div>
			<TableOvertime />
			<ModalDetailOvertime />
		</div>
	)
}

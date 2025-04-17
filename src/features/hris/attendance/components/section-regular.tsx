import { parseAsBoolean, parseAsInteger, useQueryStates } from 'nuqs'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'

import { useCurrentDate } from '@/shared/hooks/use-current-date'
import { useDateIndex } from '@/shared/hooks/use-date-index'
import { Button } from '@/shared/components/ui/button'
import CardData from '@/shared/components/card-data'
import SearchV3 from '@/shared/components/search-v3'

import { UserSearch, X } from 'lucide-react'
import TableRegular from './table-regular'
import ViewType from './view-type'
import { useTotalAttendancePerDay } from '../api/use-total-attendance-per-day'
import { cn } from '@/shared/utils/cn'

export default function AttendanceRegular() {
	const { month } = useCurrentDate()

	const [query, setQuery] = useQueryStates({
		date: parseAsInteger.withDefault(0),
		month: parseAsInteger.withDefault(month),
		notYet: parseAsBoolean.withDefault(false),
	})

	const { resultDate } = useDateIndex({
		indexDate: query.date > 0 ? query.date : new Date().getDate(),
		indexMonth: query.month,
	})

	const { data } = useTotalAttendancePerDay({
		startDate: resultDate.toString(),
	})

	return (
		<div className='w-full'>
			<div className='flex gap-8 lg:gap-20 items-center flex-col md:flex-row w-fit'>
				<div className='flex flex-col'>
					<p className='text-ink-light text-sm'>Tanggal</p>
					<p className='text-ink-secondary text-xl font-medium'>
						{format(query.date > 0 ? resultDate : new Date(), 'PPP', {
							locale: id,
						})}
					</p>
				</div>
				<div className='flex gap-6 items-center'>
					<CardData title='Hadir' value={data?.data?.total_presence || 0} />
					<CardData title='Tidak Hadir' value={data?.data?.total_absent || 0} />
					<CardData
						title='Belum diabsen'
						value={data?.data?.total_notYet || 0}
					/>
				</div>
			</div>
			<div className='flex gap-4 items-center flex-wrap md:flex-nowrap w-full py-6'>
				<SearchV3 />
				<Button
					variant='secondary'
					className={cn(
						'gap-1 px-2.5',
						query.notYet && 'bg-brand hover:bg-blue-800'
					)}
					onClick={() => setQuery({ notYet: !query.notYet })}
				>
					<UserSearch
						size={18}
						className={cn('text-ink-light', query.notYet && 'text-white')}
					/>
					<span
						className={cn(
							'px-0.5 text-ink-secondary',
							query.notYet && 'text-white'
						)}
					>
						Belum diabsen{' '}
					</span>
					{query.notYet && <X size={18} className='text-white ml-2' />}
				</Button>
				<div className='ml-auto'>
					<ViewType />
				</div>
			</div>
			<TableRegular />
		</div>
	)
}

import { parseAsBoolean, parseAsInteger, useQueryStates } from 'nuqs'
import { UserSearch, X } from 'lucide-react'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'

import { useCurrentDate } from '@/shared/hooks/use-current-date'
import { useDateIndex } from '@/shared/hooks/use-date-index'
import { Button } from '@/shared/components/ui/button'
import SearchV3 from '@/shared/components/common/search-v3'
import { cn } from '@/shared/utils/cn'

import TableRegular from './table-regular'
import ViewType from './view-type'

export default function SectionRegular() {
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

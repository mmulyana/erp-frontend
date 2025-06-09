import { parseAsBoolean, parseAsString, useQueryStates } from 'nuqs'
import { UserSearch, X } from 'lucide-react'

import FilterEmployee from '@/features/hris/employee/components/filter-employee'

import FilterReset from '@/shared/components/common/filter-reset'
import SearchV3 from '@/shared/components/common/search-v3'
import HeadPage from '@/shared/components/common/head-page'
import { useHasQueryValue } from '@/shared/hooks/use-has-query'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'

import TableRegular from './table-regular'
import ViewType from './view-type'
import { useLocalStorage } from '@uidotdev/usehooks'
import GridRegular from './grid-regular'

export default function SectionRegular() {
	const [view] = useLocalStorage<string>('view-type', 'table')

	const [query, setQuery] = useQueryStates({
		notYet: parseAsBoolean.withDefault(false),
		position: parseAsString.withDefault(''),
	})

	const hasValue = useHasQueryValue(query)

	return (
		<div className='w-full space-y-6'>
			<HeadPage
				title='Reguler'
				subtitle='Kelola absensi reguler pegawai harian'
			/>
			<div className='p-6 bg-white rounded-xl border border-line space-y-6'>
				<div className='flex gap-4 items-center flex-wrap md:flex-nowrap w-full'>
					<SearchV3 className='w-28' placeholder='Cari' />
					<ViewType />
					<FilterReset
						show={hasValue}
						onClick={() => {
							setQuery({
								notYet: null,
								position: null,
							})
						}}
					/>

					<div className='ml-auto flex gap-4 items-start'>
						<Button
							variant='outline'
							className={cn(
								'gap-1 px-2.5',
								query.notYet && 'bg-brand hover:bg-blue-800 border-brand'
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
						<FilterEmployee hideFilter={['active', 'lastEdu']} />
					</div>
				</div>
				{view === 'table' ? <TableRegular /> : <GridRegular />}
			</div>
		</div>
	)
}

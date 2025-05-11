import { parseAsBoolean, useQueryStates } from 'nuqs'
import { UserSearch, X } from 'lucide-react'

import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import SearchV3 from '@/shared/components/common/search-v3'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'

import TableRegular from './table-regular'
import ViewType from './view-type'

export default function SectionRegular() {
	const [query, setQuery] = useQueryStates({
		notYet: parseAsBoolean.withDefault(false),
	})

	return (
		<div className='w-full space-y-6'>
			<div className='flex gap-8 lg:gap-20 items-center flex-col md:flex-row w-fit'>
				<div>
					<p className='text-ink-primary leading-none mb-2 font-medium'>
						Reguler
					</p>
					<p className='text-ink-primary/50 leading-none'>
						Kelola absensi reguler pegawai harian
					</p>
				</div>
			</div>
			<div className='p-6 bg-white rounded-xl border border-line space-y-6'>
				<div className='flex gap-4 items-center flex-wrap md:flex-nowrap w-full'>
					<SearchV3 />
					<ViewType />

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
						<FilterButton></FilterButton>
						<SortButton></SortButton>
					</div>
				</div>
				<TableRegular />
			</div>
		</div>
	)
}

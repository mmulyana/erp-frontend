import { useAtomValue } from 'jotai'

import ViewToggle, { viewAtom } from './view-toggle'
import RegularTable from './regular-table'
import FilterReset from './filter-reset'
import RegularGrid from './regular-grid'
import FilterDate from './filter-date'
import DateRange from './date-range'

export function Regular() {
	const toggle = useAtomValue(viewAtom)
	const view = useAtomValue(viewAtom)

	return (
		<div className='p-4 min-h-[calc(100vh-141px)] pb-14'>
			<div className='flex justify-between items-center mb-6'>
				<div className='flex gap-4 flex-wrap'>
					{view === 'grid' ? <FilterDate /> : <DateRange />}
					<FilterReset />
					<ViewToggle />
				</div>
			</div>
			{toggle === 'grid' ? <RegularGrid /> : <RegularTable />}
		</div>
	)
}

import { parseAsString, useQueryStates } from 'nuqs'
import { Check, X } from 'lucide-react'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'
import { useState } from 'react'

import { DateRangePickerV1 } from '@/shared/components/common/date-range-picker-v1'
import { Pagination } from '@/shared/components/common/data-table/component'
import EmptyState from '@/shared/components/common/empty-state'
import SearchV3 from '@/shared/components/common/search-v3'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/components/ui/table'

import { useWeekRange } from '@/features/hris/_hooks/use-week-range'
import { getDatesInRange } from '@/shared/utils/date-range'

import { useReportAttendance } from '../../api/regular/use-report-attendance'

export default function TableReport() {
	const weeks = useWeekRange()
	const [dateRange, setDateRange] = useState<{
		from: Date | undefined
		to: Date | undefined
	}>({
		from: new Date(weeks[0]),
		to: new Date(weeks[weeks.length - 1]),
	})

	const [query] = useQueryStates({
		q: parseAsString.withDefault(''),
		page: parseAsString.withDefault('1'),
		limit: parseAsString.withDefault('10'),
	})

	const { data } = useReportAttendance({
		endDate: dateRange.to?.toString(),
		startDate: dateRange.from?.toString(),
		limit: query.limit,
		page: query.page,
		search: query.q,
	})

	const heads = getDatesInRange(
		dateRange.from?.toString() || weeks[0],
		dateRange.to?.toString() || weeks[weeks.length - 1]
	)

	const isDataExists = data?.data && data?.data?.data.length > 0

	return (
		<>
			<div className='flex justify-between items-center py-4'>
				<div className='flex gap-4 items-center'>
					<SearchV3 />
				</div>
				<DateRangePickerV1
					startDate={new Date(weeks[0])}
					endDate={new Date(weeks[weeks.length - 1])}
					onChange={setDateRange}
				/>
			</div>
			<div className='rounded-md border overflow-hidden'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='border-r bg-white' rowSpan={2}></TableHead>
							{heads.map((day, index) => (
								<TableHead
									key={index}
									className='text-center border-r font-medium bg-gray-50'
								>
									<p>{format(new Date(day), 'EEE', { locale: id })}</p>
									<p>{format(new Date(day), 'd')}</p>
								</TableHead>
							))}
							<TableHead className='text-center border-r bg-white' rowSpan={2}>
								<Check className='mx-auto h-5 w-5 text-success' />
							</TableHead>
							<TableHead className='text-center bg-white' rowSpan={2}>
								<X className='mx-auto h-5 w-5 text-error' />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isDataExists &&
							data?.data?.data?.map((item, itemIndex) => (
								<TableRow
									key={itemIndex}
									className={itemIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
								>
									<TableCell className='font-medium border-r'>
										{item.fullname}
									</TableCell>
									{item.attendance.map((status, attIndex) => (
										<TableCell
											key={attIndex}
											className='text-center p-0 border-r h-10'
										>
											{status ? (
												status === 'presence' ? (
													<div className='flex items-center justify-center h-full'>
														<div className='bg-success rounded-full p-1 w-6 h-6 flex items-center justify-center'>
															<Check className='h-5 w-5 text-white' />
														</div>
													</div>
												) : (
													<div className='flex items-center justify-center h-full'>
														<div className='rounded-full p-1 w-6 h-6 flex items-center justify-center'>
															<X className='h-5 w-5 text-error' />
														</div>
													</div>
												)
											) : (
												<div className='flex items-center justify-center h-full'>
													<div className='rounded-full p-1 w-6 h-6 flex items-center justify-center'></div>
												</div>
											)}
										</TableCell>
									))}
									<TableCell className='text-center font-medium border-r text-ink-secondary'>
										{item.present}
									</TableCell>
									<TableCell className='text-center font-medium text-ink-secondary'>
										{item.absent}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
				{!isDataExists && (
					<div className='w-full'>
						<EmptyState />
					</div>
				)}
				<div className='border-t border-border bg-surface'>
					<Pagination
						totalItems={data?.data.total || 0}
						totalPages={data?.data.total_pages || 0}
					/>
				</div>
			</div>
		</>
	)
}

import PhotoUrl from '@/shared/components/common/photo-url'
import { Attendance } from '../../types'
import { useCreateAttendance } from '../../api/regular/use-create-attendance'
import { useUpdateAttendance } from '../../api/regular/use-update-attendance'
import ButtonRegular from './button-regular'
import {
	parseAsBoolean,
	parseAsString,
	parseAsTimestamp,
	useQueryStates,
} from 'nuqs'
import { useAttendances } from '../../api/regular/use-attendances'
import { usePagination } from '@/shared/hooks/use-pagination'
import { Pagination } from '@/shared/components/common/data-table/component'

export default function GridRegular() {
	const { q, limit, page, sortBy, sortOrder } = usePagination()

	const [query] = useQueryStates({
		date: parseAsTimestamp,
		notYet: parseAsBoolean,
		position: parseAsString.withDefault(''),
	})

	const date = new Date(query.date || Date.now())
	date.setHours(0, 0, 0, 0)
	const startDate = date.toString()

	const { mutate } = useCreateAttendance()
	const { mutate: update } = useUpdateAttendance()

	const { data } = useAttendances({
		limit: limit,
		page: page,
		search: q,
		startDate,
		notYet: String(query.notYet),
		sortBy,
		sortOrder,
		position: query.position,
	})

	return (
		<div className='space-y-6'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				{data?.data?.data?.map((i) => (
					<div
						className='p-6 bg-white rounded-xl border border-border flex flex-col justify-center items-center gap-2'
						key={i.employeeId}
					>
						<PhotoUrl url={i.photoUrl} style={{img: 'max-h-24 max-w-24'}} />
						<p>{i.fullname}</p>
						<div className='flex gap-2 items-center'>
							<ButtonRegular
								variant='presence'
								status={i.status}
								onClick={() => {
									if (i?.status !== null) {
										update({
											employeeId: i?.employeeId,
											date: startDate.toString(),
											type: 'presence',
										})
										return
									}
									mutate({
										employeeId: i?.employeeId,
										date: startDate.toString(),
										type: 'presence',
									})
								}}
							/>
							<ButtonRegular
								variant='absent'
								status={i?.status}
								onClick={() => {
									if (i?.status !== null) {
										update({
											employeeId: i?.employeeId,
											date: startDate.toString(),
											type: 'absent',
										})
										return
									}
									mutate({
										employeeId: i?.employeeId,
										date: startDate.toString(),
										type: 'absent',
									})
								}}
							/>
						</div>
					</div>
				))}
			</div>
			<Pagination
				totalItems={data?.data?.total}
				totalPages={data?.data?.total_pages}
			/>
		</div>
	)
}

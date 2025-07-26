import {
	parseAsBoolean,
	parseAsString,
	parseAsTimestamp,
	useQueryStates,
} from 'nuqs'
import { ColumnDef } from '@tanstack/react-table'

import { usePagination } from '@/shared/hooks/use-pagination'
import { DataTable } from '@/shared/components/common/data-table'

import { useCreateAttendance } from '../../api/regular/use-create-attendance'
import { useUpdateAttendance } from '../../api/regular/use-update-attendance'
import { useAttendances } from '../../api/regular/use-attendances'
import { Attendance } from '../../types'

import ButtonRegular from './button-regular'
import ProtectedComponent from '@/shared/components/common/protected'
import { permissions } from '@/shared/constants/permissions'

export default function TableRegular() {
	const { q, limit, page, sortBy, sortOrder } = usePagination()
	const [query] = useQueryStates({
		date: parseAsTimestamp,
		notYet: parseAsBoolean,
		position: parseAsString.withDefault(''),
	})

	const date = new Date(query.date || Date.now())
	date.setHours(0, 0, 0, 0)
	const startDate = date.toString()

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

	const { mutate } = useCreateAttendance()
	const { mutate: update } = useUpdateAttendance()

	const columns: ColumnDef<Attendance>[] = [
		{
			accessorKey: 'fullname',
			header: 'Nama lengkap',
		},
		{
			accessorKey: 'position',
			header: 'Jabatan',
		},
		{
			id: 'status',
			header: 'Status',
			cell: ({ row }) => {
				return (
					<ProtectedComponent required={[permissions.attendance_create]}>
						<div className='flex gap-2 items-center'>
							<ButtonRegular
								variant='presence'
								status={row.original.status}
								onClick={() => {
									if (row.original.status !== null) {
										update({
											employeeId: row.original.employeeId,
											date: startDate.toString(),
											type: 'presence',
										})
										return
									}
									mutate({
										employeeId: row.original.employeeId,
										date: startDate.toString(),
										type: 'presence',
									})
								}}
							/>
							<ButtonRegular
								variant='absent'
								status={row.original.status}
								onClick={() => {
									if (row.original.status !== null) {
										update({
											employeeId: row.original.employeeId,
											date: startDate.toString(),
											type: 'absent',
										})
										return
									}
									mutate({
										employeeId: row.original.employeeId,
										date: startDate.toString(),
										type: 'absent',
									})
								}}
							/>
						</div>
					</ProtectedComponent>
				)
			},
		},
	]

	return (
		<DataTable
			columns={columns}
			data={data?.data.data || []}
			totalItems={data?.data.total}
			totalPages={data?.data.total_pages}
			withPagination
		/>
	)
}

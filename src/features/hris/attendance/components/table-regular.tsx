import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { ColumnDef } from '@tanstack/react-table'

import { useCurrentDate } from '@/shared/hooks/use-current-date'
import { useDateIndex } from '@/shared/hooks/use-date-index'
import { DataTable } from '@/shared/components/data-table'

import { useCreateAttendance } from '../api/use-create-attendance'
import { useUpdateAttendance } from '../api/use-update.attendance'
import { useAttendances } from '../api/use-attendances'
import ButtonRegular from './button-regular'
import { Attendance } from '../types'

export default function TableRegular() {
	const { month } = useCurrentDate()

	const [query] = useQueryStates({
		date: parseAsInteger.withDefault(0),
		month: parseAsInteger.withDefault(month),

		// for pagination
		q: parseAsString.withDefault(''),
		page: parseAsString.withDefault('1'),
		limit: parseAsString.withDefault('10'),
	})

	const { resultDate } = useDateIndex({
		indexDate: query.date > 0 ? query.date : new Date().getDate(),
		indexMonth: query.month,
	})

	const { data: dataRegular } = useAttendances({
		limit: query.limit,
		page: query.page,
		search: query.q,
		startDate: resultDate.toString(),
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
					<div className='flex gap-2 items-center'>
						<ButtonRegular
							variant='presence'
							status={row.original.status}
							onClick={() => {
								if (row.original.status !== null) {
									update({
										employeeId: row.original.employeeId,
										date: resultDate.toString(),
										type: 'presence',
									})
									return
								}
								mutate({
									employeeId: row.original.employeeId,
									date: resultDate.toString(),
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
										date: resultDate.toString(),
										type: 'absent',
									})
									return
								}
								mutate({
									employeeId: row.original.employeeId,
									date: resultDate.toString(),
									type: 'absent',
								})
							}}
						/>
					</div>
				)
			},
		},
	]

	return (
		<DataTable
			columns={columns}
			data={dataRegular?.data.data || []}
			totalItems={dataRegular?.data.total}
			totalPages={dataRegular?.data.total_pages}
			withPagination
			variant='rounded-bordered'
		/>
	)
}

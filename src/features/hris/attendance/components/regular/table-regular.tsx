import { parseAsIsoDate, parseAsString, useQueryStates } from 'nuqs'
import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/shared/components/common/data-table'

import { useCreateAttendance } from '../../api/regular/use-create-attendance'
import { useUpdateAttendance } from '../../api/regular/use-update-attendance'
import { useAttendances } from '../../api/regular/use-attendances'
import { Attendance } from '../../types'

import ButtonRegular from './button-regular'

export default function TableRegular() {
	const [query] = useQueryStates({
		date: parseAsIsoDate.withDefault(new Date()),

		// for pagination
		q: parseAsString.withDefault(''),
		page: parseAsString.withDefault('1'),
		limit: parseAsString.withDefault('10'),
	})

	const date = new Date(query.date || Date.now())
	date.setHours(0, 0, 0, 0)
	const startDate = date.toString()

	const { data } = useAttendances({
		limit: query.limit,
		page: query.page,
		search: query.q,
		startDate,
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
										date: query.date.toString(),
										type: 'presence',
									})
									return
								}
								mutate({
									employeeId: row.original.employeeId,
									date: query.date.toString(),
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
										date: query.date.toString(),
										type: 'absent',
									})
									return
								}
								mutate({
									employeeId: row.original.employeeId,
									date: query.date.toString(),
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
			data={data?.data.data || []}
			totalItems={data?.data.total}
			totalPages={data?.data.total_pages}
			withPagination
		/>
	)
}

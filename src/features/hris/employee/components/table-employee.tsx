import { parseAsString, useQueryStates } from 'nuqs'
import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

import { DataTable } from '@/shared/components/common/data-table'
import BadgeV1 from '@/shared/components/common/badge-v1'
import { paths } from '@/shared/constants/paths'
import { Employee } from '@/shared/types'

import { useEmployees } from '@/features/hris/employee/api/use-employees'

export default function TableEmployee() {
	const navigate = useNavigate()

	const [query] = useQueryStates({
		q: parseAsString.withDefault(''),
		page: parseAsString.withDefault('1'),
		limit: parseAsString.withDefault('10'),
	})

	const { isLoading, data } = useEmployees({
		limit: query.limit,
		page: query.page,
		search: query.q,
	})

	// COLUMNS EMPLOYEE
	const columns: ColumnDef<Employee>[] = [
		{
			id: 'fullname',
			accessorKey: 'fullname',
			header: 'Nama lengkap',
		},
		{
			id: 'joined_at',
			accessorKey: 'joinedAt',
			header: 'Bergabung sejak',
			cell: ({ row }) =>
				row.original.joinedAt && (
					<p>{format(row.original.joinedAt, 'dd MMMM yyyy')}</p>
				),
		},
		{
			id: 'position',
			accessorKey: 'position',
			header: 'Jabatan',
		},
		{
			id: 'last_education',
			accessorKey: 'lastEducation',
			header: 'Pend terakhir',
		},
		{
			id: 'phone',
			accessorKey: 'phone',
			header: 'Nomor telp',
		},
		{
			id: 'status',
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => (
				<BadgeV1
					text={row.original.status ? 'Aktif' : 'Nonaktif'}
					variant={row.original.status ? 'default' : 'danger'}
				/>
			),
		},
	]
	// COLUMNS

	return (
		<>
			<DataTable
				columns={columns}
				data={data?.data.data || []}
				isLoading={isLoading}
				autoRedirect
				totalItems={data?.data.total}
				totalPages={data?.data.total_pages}
				withPagination
				nonClickableColumns={[]}
				onCellClick={({ id }) =>
					navigate(`${paths.hrisMasterDataEmployee}/${id}`)
				}
			/>
		</>
	)
}

import { useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

import ToggleSwitch from '@/shared/components/common/toggle-switch'
import SearchV3 from '@/shared/components/common/search-v3'
import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import { paths } from '@/shared/constants/paths'
import { keys } from '@/shared/constants/keys'
import { formatPhone } from '@/shared/utils'
import { Employee } from '@/shared/types'

import { useEmployees } from '@/features/hris/employee/api/use-employees'

import { useUpdateEmployee } from '../api/use-update-employee'

export default function TableEmployee() {
	const navigate = useNavigate()
	const { page, limit, q } = usePagination()

	const queryClient = useQueryClient()
	const { mutate } = useUpdateEmployee()

	const { isLoading, data } = useEmployees({
		limit,
		page,
		search: q,
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
			cell: ({ row }) => row.original.lastEducation.toUpperCase(),
		},
		{
			id: 'phone',
			accessorKey: 'phone',
			header: 'Nomor telp',
			cell: ({ row }) =>
				row.original.phone && formatPhone(row?.original?.phone),
		},
		{
			id: 'status',
			accessorKey: 'active',
			header: 'Status',
			cell: ({ row }) => (
				<div className='w-[120px]'>
					<ToggleSwitch
						value={row.original.active}
						label={{ true: 'Aktif', false: 'Nonaktif' }}
						onCheck={(val) => {
							mutate(
								{ id: row.original.id, active: val },
								{
									onSuccess: () => {
										queryClient.invalidateQueries({
											queryKey: [keys.employeeReportData],
										})
									},
								}
							)
						}}
					/>
				</div>
			),
		},
	]
	// COLUMNS

	return (
		<div className='p-6 rounded-2xl bg-white border border-border'>
			<div className='flex justify-between items-center mb-4'>
				<SearchV3 />
			</div>
			<DataTable
				columns={columns}
				data={data?.data.data || []}
				isLoading={isLoading}
				autoRedirect
				totalItems={data?.data.total}
				totalPages={data?.data.total_pages}
				withPagination
				nonClickableColumns={['status']}
				onCellClick={({ id }) =>
					navigate(`${paths.hrisMasterdataEmployee}/${id}`)
				}
			/>
		</div>
	)
}

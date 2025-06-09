import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import { CompanyClient } from '@/shared/types/api'

import { useCompanies } from '../api/use-companies'
import { paths } from '@/shared/constants/paths'
import PhotoUrl from '@/shared/components/common/photo-url'

export default function TableCompany() {
	const navigate = useNavigate()
	const { limit, page, q, sortOrder } = usePagination()

	const { isLoading, data } = useCompanies({
		limit,
		page,
		search: q,
		sortOrder,
	})

	// COLUMNS EMPLOYEE
	const columns: ColumnDef<CompanyClient>[] = [
		{
			id: 'name',
			accessorKey: 'name',
			cell: ({ row }) => (
				<div className='flex gap-2 items-center py-2'>
					<PhotoUrl
						url={row.original?.photoUrl || ''}
						style={{ img: 'h-8 w-8', icon: 'h-5 w-5' }}
					/>
					<p className='text-ink-primary text-nowrap'>{row.original?.name}</p>
				</div>
			),
		},
		{
			accessorKey: 'phone',
			header: () => <p className='text-nowrap'>No. telp (Kantor)</p>,
		},
		{
			accessorKey: 'email',
			header: 'Email',
		},
		{
			accessorKey: 'address',
			header: 'Alamat',
		},
		{
			accessorKey: 'employees',
			header: () => <p className='text-nowrap'>Jml klien</p>,
			cell: ({ row }) => row.original._count.employees,
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
					navigate(`${paths.projectMasterdataClientCompany}/${id}`)
				}
			/>
		</>
	)
}

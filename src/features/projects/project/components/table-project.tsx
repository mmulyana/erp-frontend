import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import { paths } from '@/shared/constants/paths'

import { useProjects } from '../api/use-projects'
import { Project } from '../types'

export default function TableProject() {
	const { limit, page, q } = usePagination()
	const navigate = useNavigate()

	const { isLoading, data } = useProjects({
		limit,
		page,
		search: q,
	})

	// COLUMNS EMPLOYEE
	const columns: ColumnDef<Project>[] = [
		{
			id: 'name',
			accessorKey: 'name',
			header: 'Nama',
		},
		{
			id: 'client',
			header: 'Klien',
			cell: ({ row }) => row.original.client?.name,
		},
		{
			id: 'lead',
			header: 'PJ Lapangan',
			cell: ({ row }) => row.original.lead?.username,
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
					navigate(`${paths.projectMasterdataProjects}/${id}`)
				}
			/>
		</>
	)
}

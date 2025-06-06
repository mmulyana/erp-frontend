import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import { paths } from '@/shared/constants/paths'
import { Role } from '@/shared/types/api'

import { useRoles } from '../api/use-roles'

export default function TableRole() {
	const navigate = useNavigate()
	const { limit, page, q, sortBy, sortOrder } = usePagination()

	const { data } = useRoles({
		limit,
		page,
		search: q,
		sortBy,
		sortOrder,
	})

	const column: ColumnDef<Role>[] = [
		{
			header: 'Nama',
			accessorKey: 'name',
		},
		{
			header: 'Deskripsi',
			accessorKey: 'description',
		},

		{
			id: 'action',
		},
	]

	return (
		<DataTable
			columns={column}
			data={data?.data.data || []}
			withPagination
			totalItems={data?.data.total}
			totalPages={data?.data.total_pages}
			autoRedirect
			onCellClick={({ id }) => navigate(`${paths.adminRole}/${id}`)}
			nonClickableColumns={['action']}
		/>
	)
}

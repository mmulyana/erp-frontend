import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import { paths } from '@/shared/constants/paths'

import { useSuppliers } from '../api/use-suppliers'
import { Supplier } from '../types'

export default function TableSupplier() {
	const { limit, page, q } = usePagination()
	const navigate = useNavigate()

	const { data, isLoading } = useSuppliers({
		limit,
		page,
		search: q,
	})

	const columns: ColumnDef<Supplier>[] = [
		{
			id: 'name',
			accessorKey: 'name',
			header: 'Nama',
		},
		{
			accessorKey: 'address',
			header: 'Alamat',
		},
	]

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
					navigate(`${paths.inventoryMasterdataSupplier}/${id}`)
				}
			/>
		</>
	)
}

import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'

import { useItems } from '../api/use-items'
import { Item } from '../types'

export default function TableItem() {
	const { limit, page, q } = usePagination()

	const { isLoading, data } = useItems({
		limit,
		page,
		search: q,
	})

	// COLUMNS EMPLOYEE
	const columns: ColumnDef<Item>[] = [
		{
			id: 'name',
			accessorKey: 'name',
			header: 'Nama',
		},
		{
			id: 'brand',
			header: 'Merek',
			cell: ({ row }) => row.original?.brand?.name,
		},
		{
			id: 'location',
			header: 'Lokasi',
			cell: ({ row }) => row.original?.location?.name,
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
				// onCellClick={({ id }) => setModal({ id, open: true })}
			/>
		</>
	)
}

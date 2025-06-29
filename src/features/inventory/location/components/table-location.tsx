import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import { paths } from '@/shared/constants/paths'

import { useLocations } from '../api/use-locations'
import { Location } from '../types'

export default function TableLocation() {
	const { limit, page, q, sortBy, sortOrder } = usePagination()
	const navigate = useNavigate()

	const { isLoading, data } = useLocations({
		limit,
		page,
		search: q,
		sortBy,
		sortOrder,
	})

	// COLUMNS EMPLOYEE
	const columns: ColumnDef<Location>[] = [
		{
			id: 'name',
			accessorKey: 'name',
			header: 'Nama',
		},
		{
			id: 'count',
			header: () => <p className='text-center'>Jumlah barang</p>,
			cell: ({ row }) => (
				<p className='text-center'>{row.original._count.inventories}</p>
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
					navigate(`${paths.inventoryMasterdataLocation}/${id}`)
				}
			/>
		</>
	)
}

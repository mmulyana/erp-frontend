import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'

import { useBrands } from '../api/use-brands'
import { useNavigate } from 'react-router-dom'
import { paths } from '@/shared/constants/paths'
import { BrandInventory } from '@/shared/types/api'

export default function TableBrand() {
	const navigate = useNavigate()
	const { limit, page, q } = usePagination()

	const { isLoading, data } = useBrands({
		limit,
		page,
		search: q,
	})

	// COLUMNS EMPLOYEE
	const columns: ColumnDef<BrandInventory>[] = [
		{
			id: 'name',
			accessorKey: 'name',
			header: 'Nama',
		},
		{
			id: 'count',
			header: () => <p className='text-center'>Jumlah barang</p>,
			cell: ({ row }) => (
				<p className='text-center'>{row.original?._count?.inventories}</p>
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
					navigate(`${paths.inventoryMasterdataBrand}/${id}`)
				}
			/>
		</>
	)
}

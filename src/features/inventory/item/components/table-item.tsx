import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import StatusBadge from '@/shared/components/common/status-badge'
import PhotoUrl from '@/shared/components/common/photo-url'
import { paths } from '@/shared/constants/paths'
import { Inventory } from '@/shared/types/api'

import { useItems } from '../api/use-items'
import { statusItem } from '../constant'
import { parseAsString, useQueryStates } from 'nuqs'

export default function TableItem() {
	const { limit, page, q, sortBy, sortOrder } = usePagination()
	const [query] = useQueryStates({
		warehouseId: parseAsString.withDefault(''),
		brandId: parseAsString.withDefault(''),
		status: parseAsString.withDefault('')
	})
	const navigate = useNavigate()

	const { isLoading, data } = useItems({
		limit,
		page,
		search: q,
		sortBy,
		sortOrder,
		brandId: query.brandId,
		warehouseId: query.warehouseId,
		status: query.status
	})

	// COLUMNS EMPLOYEE
	const columns: ColumnDef<Inventory>[] = [
		{
			id: 'name',
			header: 'Nama',
			cell: ({ row }) => (
				<div className='flex gap-2 items-center py-2'>
					<PhotoUrl
						url={row.original.photoUrl || ''}
						style={{ img: 'h-12 w-12 rounded-md' }}
					/>
					<p className='text-ink-primary'>{row.original.name}</p>
				</div>
			),
		},
		{
			id: 'total',
			header: 'Total',
			cell: ({ row }) =>
				`${row.original.totalStock} ${row.original.unitOfMeasurement}`,
		},
		{
			id: 'location',
			header: 'Gudang',
			cell: ({ row }) =>
				row.original.warehouse?.deletedAt
					? ''
					: row.original.warehouse?.name ?? '',
		},
		{
			id: 'brand',
			header: 'Merek',
			cell: ({ row }) =>
				row.original.brand?.deletedAt ? '' : row.original.brand?.name ?? '',
		},
		{
			id: 'status',
			header: 'Status',
			accessorKey: 'status',
			cell: ({ row }) => (
				<StatusBadge options={statusItem} value={row.original.status} />
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
					navigate(`${paths.inventoryMasterdataItem}/${id}`)
				}
				// onCellClick={({ id }) => setModal({ id, open: true })}
			/>
		</>
	)
}

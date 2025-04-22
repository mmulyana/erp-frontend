import { ColumnDef } from '@tanstack/react-table'
import { useSetAtom } from 'jotai'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'

import { atomModalLocation } from './modal-detail-location'
import { useLocations } from '../api/use-locations'
import { Location } from '../types'

export default function TableLocation() {
	const setModal = useSetAtom(atomModalLocation)

	const { limit, page, q } = usePagination()

	const { isLoading, data } = useLocations({
		limit,
		page,
		search: q,
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
			header: 'Jumlah item',
			cell: ({ row }) => row.original._count.inventories,
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
				onCellClick={({ id }) => setModal({ id, open: true })}
			/>
		</>
	)
}

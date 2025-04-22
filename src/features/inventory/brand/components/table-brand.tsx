import { ColumnDef } from '@tanstack/react-table'
import { useSetAtom } from 'jotai'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'

import { atomModalBrand } from './modal-detail-brand'
import { useBrands } from '../api/use-brands'

export default function TableBrand() {
	const setModal = useSetAtom(atomModalBrand)

	const { limit, page, q } = usePagination()

	const { isLoading, data } = useBrands({
		limit,
		page,
		search: q,
	})

	// COLUMNS EMPLOYEE
	const columns: ColumnDef<any>[] = [
		{
			id: 'name',
			accessorKey: 'name',
			header: 'Nama',
		},
		{
			id: 'count',
			header: 'Jumlah item',
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

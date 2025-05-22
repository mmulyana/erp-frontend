import { ColumnDef } from '@tanstack/react-table'
import { useSetAtom } from 'jotai'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'

import { atomModalCompany } from './modal-detail-company'
import { useCompanies } from '../api/use-companies'
import { CompanyClient } from '@/shared/types/api'

export default function TableCompany() {
	const setModal = useSetAtom(atomModalCompany)
	const { limit, page, q } = usePagination()

	const { isLoading, data } = useCompanies({
		limit,
		page,
		search: q,
	})

	// COLUMNS EMPLOYEE
	const columns: ColumnDef<CompanyClient>[] = [
		{
			id: 'name',
			accessorKey: 'name',
			header: 'Nama',
		},
		{
			accessorKey: 'phone',
			header: 'No. telp (Kantor)',
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
			header: 'Jml klien',
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
				onCellClick={({ id }) => setModal({ id, open: true })}
			/>
		</>
	)
}

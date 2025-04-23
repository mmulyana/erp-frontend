import { ColumnDef } from '@tanstack/react-table'
import { useSetAtom } from 'jotai'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'

import { atomModalCompany } from './modal-detail-company'
import { useCompanies } from '../api/use-companies'
import { Company } from '../types'

export default function TableCompany() {
	const setModal = useSetAtom(atomModalCompany)
	const { limit, page, q } = usePagination()

	const { isLoading, data } = useCompanies({
		limit,
		page,
		search: q,
	})

	// COLUMNS EMPLOYEE
	const columns: ColumnDef<Company>[] = [
		{
			id: 'name',
			accessorKey: 'name',
			header: 'Nama',
		},
		{
			accessorKey: 'email',
			header: 'Email',
		},
		{
			accessorKey: 'phone',
			header: 'Nomor telp',
		},
		{
			accessorKey: 'position',
			header: 'Jabatan',
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

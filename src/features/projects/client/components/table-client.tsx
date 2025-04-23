import { ColumnDef } from '@tanstack/react-table'
import { useSetAtom } from 'jotai'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'

import { atomModalClient } from './modal-detail-client'
import { useClients } from '../api/use-clients'
import { Client } from '../types'

export default function TableClient() {
	const setModal = useSetAtom(atomModalClient)
	const { limit, page, q } = usePagination()

	const { isLoading, data } = useClients({
		limit,
		page,
		search: q,
	})

	// COLUMNS EMPLOYEE
	const columns: ColumnDef<Client>[] = [
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
		{
			id: 'company',
			header: 'Perusahaan',
			cell: ({ row }) => row.original?.company?.name,
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
				nonClickableColumns={['company']}
				onCellClick={({ id }) => setModal({ id, open: true })}
			/>
		</>
	)
}

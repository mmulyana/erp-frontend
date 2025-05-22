import { ColumnDef } from '@tanstack/react-table'
import { useSetAtom } from 'jotai'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'

import { atomModalClient } from './modal-detail-client'
import { useClients } from '../api/use-clients'
import PhotoUrl from '@/shared/components/common/photo-url'
import { Client } from '@/shared/types/api'

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
			cell: ({ row }) => {
				if (!row.original.company) return null
				return (
					<div className='flex gap-2 items-center'>
						<PhotoUrl
							url={row.original.company?.photoUrl || ''}
							style={{ img: 'h-8 w-8', icon: 'h-5 w-5' }}
						/>
						<p className='text-ink-primary'>{row.original.company?.name}</p>
					</div>
				)
			},
		},
		{
			id: 'total',
			header: 'Jml proyek',
			cell: ({ row }) => row.original._count?.project,
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

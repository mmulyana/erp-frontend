import { ColumnDef } from '@tanstack/react-table'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import PhotoUrl from '@/shared/components/common/photo-url'
import { Loan } from '@/shared/types/api'

import { useLoans } from '../api/use-loans'
import { Link } from 'react-router-dom'
import { paths } from '@/shared/constants/paths'
import { ExternalLink } from 'lucide-react'

export default function TableLoan() {
	const { q, limit, page } = usePagination()
	const { data } = useLoans({
		page,
		limit,
		search: q,
	})

	const column: ColumnDef<Loan>[] = [
		{
			id: 'date',
			header: 'Tanggal',
			cell: ({ row }) =>
				format(new Date(row.original.requestDate), 'PPP', { locale: id }),
		},
		{
			id: 'item',
			header: 'Barang',
			cell: ({ row }) => (
				<div className='flex gap-2 items-center py-2'>
					<PhotoUrl
						url={row.original.item.photoUrl || ''}
						style={{ img: 'h-10 w-10' }}
					/>
					<p className='text-ink-primary'>{row.original.item.name}</p>
				</div>
			),
		},
		{
			id: 'qty',
			header: 'Qty',
			accessorKey: 'requestQuantity',
		},
		{
			id: 'borrower',
			header: 'Peminjam',
			cell: ({ row }) => (
				<div className='flex gap-2 items-center'>
					<PhotoUrl
						url={row.original.borrower.photoUrl || ''}
						style={{ img: 'h-10 w-10' }}
					/>
					<p className='text-ink-primary'>{row.original.borrower.username}</p>
				</div>
			),
		},
		{
			id: 'project',
			header: 'Proyek',
			cell: ({ row }) => (
				<div className='flex gap-2 items-center'>
					<p className='text-ink-primary'>{row.original.project.name}</p>
					<Link
						to={`${paths.projectMasterdataProjects}/${row.original.project.id}`}
						className='flex gap-1 items-center'
					>
						<span className='px-0.5'>Lihat</span>
						<ExternalLink size={16} />
					</Link>
				</div>
			),
		},
		{
			id: 'note',
			header: 'Keterangan',
			accessorKey: 'note',
		},
		{
			id: 'status',
		},
	]

	return (
		<DataTable
			columns={column}
			data={data?.data?.data || []}
			withPagination
			totalItems={data?.data?.total}
			totalPages={data?.data?.total_pages}
		/>
	)
}

import { parseAsIsoDate, parseAsString, useQueryStates } from 'nuqs'
import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

import { DataTable } from '@/shared/components/common/data-table'
import { Badge } from '@/shared/components/ui/badge'
import { paths } from '@/shared/constants/paths'
import { formatToRupiah } from '@/shared/utils'
import { cn } from '@/shared/utils/cn'

import { useCashAdvances } from '../api/use-cash-advances'
import { CashAdvance } from '../types'

export default function TableCashAdvance() {
	const navigate = useNavigate()

	const [query] = useQueryStates({
		q: parseAsString.withDefault(''),
		page: parseAsString.withDefault('1'),
		limit: parseAsString.withDefault('10'),
		startDate: parseAsIsoDate.withDefault(new Date()),
		endDate: parseAsIsoDate.withDefault(new Date()),
	})

	const { data, isLoading } = useCashAdvances({
		limit: query.limit,
		page: query.page,
		search: query.q,
	})

	const columns: ColumnDef<CashAdvance>[] = [
		{
			id: 'fullname',
			header: 'Nama lengkap',
			cell: ({ row }) => row.original.employee?.fullname,
		},
		{
			id: 'position',
			header: 'Jabatan',
			cell: ({ row }) => row.original.employee?.position,
		},
		{
			id: 'amount',
			header: 'Jumlah',
			cell: ({ row }) => formatToRupiah(row.original.amount),
		},
		{
			id: 'requestDate',
			header: 'Tanggal',
			cell: ({ row }) => format(new Date(row.original.date), 'dd/MM/yyyy'),
		},
		{
			id: 'note',
			header: 'Keterangan',
			accessorKey: 'note',
		},
		{
			id: 'status',
			header: 'Status',
			cell: ({ row }) => {
				const isPaid = row.original.status === 'paidOff'
				return (
					<Badge variant='outline' className='gap-1'>
						<div
							className={cn(
								'h-1.5 w-1.5 rounded-full',
								isPaid ? 'bg-success' : 'bg-error'
							)}
						></div>
						<p
							className={cn(
								'text-sm text-nowrap',
								isPaid ? 'text-success' : 'text-error'
							)}
						>
							{isPaid ? 'Lunas' : 'Blm lunas'}
						</p>
					</Badge>
				)
			},
		},
	]
	return (
		<DataTable
			columns={columns}
			data={data?.data.data || []}
			withPagination
			totalItems={data?.data.total}
			totalPages={data?.data.total_pages}
			onCellClick={({ id }) => {
				navigate(`${paths.hrisCashAdvance}/${id}`)
			}}
			nonClickableColumns={[]}
			isLoading={isLoading}
			autoRedirect
		/>
	)
}

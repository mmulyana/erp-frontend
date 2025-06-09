import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

import { DataTable } from '@/shared/components/common/data-table'
import { PayrollPeriod, PeriodStatus } from '@/shared/types/api'
import { usePagination } from '@/shared/hooks/use-pagination'
import { Badge } from '@/shared/components/ui/badge'
import { paths } from '@/shared/constants/paths'
import { formatThousands } from '@/shared/utils'
import { cn } from '@/shared/utils/cn'

import { usePeriods } from '../api/use-periods'

export default function TablePayroll() {
	const navigate = useNavigate()
	const { limit, page, q, status, sortBy, sortOrder } = usePagination()

	const { data } = usePeriods({
		limit,
		page,
		search: q,
		sortBy,
		sortOrder,
		status,
	})

	const column: ColumnDef<PayrollPeriod & { totalSpending: number }>[] = [
		{
			accessorKey: 'name',
			header: 'Nama',
		},
		{
			id: 'startDate',
			header: 'Tanggal mulai',
			cell: ({ row }) =>
				row.original.startDate && format(row.original.startDate, 'dd/MM/yyyy'),
		},
		{
			id: 'endDate',
			header: 'Tanggal berakhir',
			cell: ({ row }) =>
				row.original.endDate && format(row.original.endDate, 'dd/MM/yyyy'),
		},
		{
			id: 'total',
			header: 'Total pengeluaran',
			cell: ({ row }) => `Rp ${formatThousands(row.original.totalSpending)}`,
		},
		{
			id: 'status',
			header: 'Status',
			cell: ({ row }) => {
				const isDone = row.original.status === PeriodStatus.DONE
				return (
					<Badge variant='outline' className='gap-1'>
						<div
							className={cn(
								'h-1.5 w-1.5 rounded-full',
								isDone ? 'bg-success' : 'bg-[#4795EF]'
							)}
						></div>
						<p
							className={cn(
								'text-sm text-nowrap',
								isDone ? 'text-success' : 'text-[#4795EF]'
							)}
						>
							{isDone ? 'Selesai' : 'Sedang diproses'}
						</p>
					</Badge>
				)
			},
		},
	]

	return (
		<DataTable
			columns={column}
			data={data?.data.data || []}
			totalItems={data?.data.total}
			totalPages={data?.data.total_pages}
			autoRedirect
			nonClickableColumns={[]}
			onCellClick={({ id }) => navigate(`${paths.hrisPayroll}/${id}`)}
		/>
	)
}

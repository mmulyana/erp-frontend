import { ColumnDef } from '@tanstack/react-table'
import { Ellipsis, Wallet } from 'lucide-react'
import { format } from 'date-fns'

import SearchV3 from '@/shared/components/common/search-v3'
import { DataTable } from '@/shared/components/common/data-table'
import { Button } from '@/shared/components/ui/button'
import { convertUTCToWIB, formatToRupiah } from '@/shared/utils'

import ChartCashAdvance from './chart-cash-advance'
import { useParams } from 'react-router-dom'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useDataCashAdvance } from '../../api/use-data-cash-advance'
import { id } from 'date-fns/locale'

export default function EmployeeCashAdvance() {
	const { id: employeeId } = useParams()
	const { limit, page, q } = usePagination()

	const { data } = useDataCashAdvance({
		id: employeeId,
		limit,
		page,
		search: q,
	})

	const columns: ColumnDef<any>[] = [
		{
			id: 'amount',
			header: 'Jumlah',
			cell: ({ row }) => formatToRupiah(row.original.amount),
		},
		{
			id: 'requestDate',
			header: 'Tanggal',
			cell: ({ row }) =>
				format(convertUTCToWIB(new Date(row.original.date)), 'PPP', {
					locale: id,
				}),
		},
		{
			id: 'note',
			header: 'Keterangan',
			accessorKey: 'note',
		},
	]
	return (
		<>
			<div className='flex gap-2 items-center p-6'>
				<Wallet className='text-ink-secondary' />
				<p className='text-ink-secondary font-medium'>Kasbon</p>
			</div>
			<div className='px-6 pb-6 grid grid-cols-1 md:grid-cols-2'>
				<ChartCashAdvance />
			</div>
			<div className='px-4 py-3 bg-surface flex justify-between items-center border-t border-border'>
				<div className='flex gap-4 items-center'>
					<SearchV3 />
				</div>
			</div>
			<DataTable
				style={{
					footer: 'bg-white',
					header: 'bg-white',
					stripRowColor: 'bg-white',
				}}
				data={data?.data?.data || []}
				columns={columns}
				totalPages={data?.data.total_pages}
				totalItems={data?.data.total}
				withPagination
			/>
		</>
	)
}

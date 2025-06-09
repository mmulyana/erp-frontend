import { ColumnDef } from '@tanstack/react-table'
import { useParams } from 'react-router-dom'
import { Wallet } from 'lucide-react'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'

import { DataTable } from '@/shared/components/common/data-table'
import { convertUTCToWIB, formatToRupiah } from '@/shared/utils'
import { usePagination } from '@/shared/hooks/use-pagination'
import SearchV3 from '@/shared/components/common/search-v3'

import { useDataCashAdvance } from '../../api/use-data-cash-advance'

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
		<div className='px-6 space-y-6 pt-6'>
			<div className='flex gap-2 items-center'>
				<Wallet className='text-ink-secondary' />
				<p className='text-ink-secondary font-medium'>Kasbon</p>
			</div>

			<div className=''>
				<SearchV3 />
			</div>
			<DataTable
				data={data?.data?.data || []}
				columns={columns}
				totalPages={data?.data.total_pages}
				totalItems={data?.data.total}
				withPagination
			/>
		</div>
	)
}

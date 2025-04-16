import { DataTable } from '@/shared/components/data-table'
import { formatToRupiah } from '@/shared/utils/formatCurrency'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useCashAdvances } from '../api/use-cash-advances'
import { parseAsIsoDate, parseAsString, useQueryStates } from 'nuqs'

export default function TableCashAdvance() {
	const [query] = useQueryStates({
		q: parseAsString.withDefault(''),
		page: parseAsString.withDefault('1'),
		limit: parseAsString.withDefault('10'),
		startDate: parseAsIsoDate.withDefault(new Date()),
		endDate: parseAsString.withDefault(''),
	})

	const { data } = useCashAdvances({
		limit: query.limit,
		page: query.page,
		search: query.q,
	})

	const columns: ColumnDef<any>[] = [
		{
			id: 'fullname',
			header: 'Nama lengkap',
			cell: ({ row }) => row.original.employee?.fullname,
		},
		{
			id: 'amount',
			header: 'Jumlah',
			cell: ({ row }) => formatToRupiah(row.original.amount),
		},
		{
			id: 'requestDate',
			header: 'Tanggal',
			cell: ({ row }) => format(new Date(row.original.date), 'dd MMMM yyyy'),
		},
		{
			id: 'note',
			header: 'Keterangan',
			accessorKey: 'note',
		},
	]
	return (
		<>
			<DataTable
				columns={columns}
				data={data?.data.data || []}
				withPagination
				totalItems={data?.data.total}
				totalPages={data?.data.total_pages}
			/>
		</>
	)
}

import { DataTable } from '@/shared/components/data-table'
import { formatToRupiah } from '@/shared/utils/formatCurrency'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

export default function TableCashAdvance() {
	const columns: ColumnDef<any>[] = [
		{
			accessorKey: 'fullname',
			header: 'Nama lengkap',
		},
		{
			id: 'amount',
			header: 'Jumlah',
			cell: ({ row }) => formatToRupiah(row.original.amount),
		},
		{
			id: 'requestDate',
			header: 'Tanggal',
			cell: ({ row }) => format(row.original.requestDate, 'dd MMMM yyyy'),
		},
		{
			id: 'note',
			header: 'Keterangan',
			accessorKey: 'note',
		},
	]
	return (
		<>
			<DataTable columns={columns} data={[]} />
		</>
	)
}

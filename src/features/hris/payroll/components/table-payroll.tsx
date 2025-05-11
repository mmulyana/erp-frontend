import { DataTable } from '@/shared/components/common/data-table'
import { ColumnDef } from '@tanstack/react-table'

export default function TablePayroll() {
	const column: ColumnDef<any>[] = [
		{
			id: 'name',
			header: 'Nama',
		},
		{
			id: 'startDate',
			header: 'Tanggal mulai',
		},
		{
			id: 'endDate',
			header: 'Tanggal berakhir',
		},
		{
			id: 'total',
			header: 'Total pengeluaran',
		},
		{
			id: 'status',
			header: 'Status',
		},
	]

	return (
		<DataTable
			columns={column}
			data={[]}
			autoRedirect
			nonClickableColumns={[]}
		/>
	)
}

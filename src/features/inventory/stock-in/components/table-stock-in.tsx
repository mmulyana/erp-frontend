import { DataTable } from '@/shared/components/common/data-table'
import { paths } from '@/shared/constants/paths'
import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'

export default function TableStockIn() {
	const navigate = useNavigate()
	const columns: ColumnDef<any>[] = [
		{
			id: 'date',
			header: 'Tanggal',
		},
		{
			id: 'totalItem',
			header: 'Jml barang',
		},
		{
			id: 'noReference',
			header: 'No. Referensi',
		},
		{
			id: 'total',
			header: 'Total',
		},
		{
			id: 'note',
			header: 'Catatan',
		},
		{
			id: 'action',
			header: '',
		},
	]

	return (
		<DataTable
			columns={columns}
			data={[]}
			autoRedirect
			nonClickableColumns={['action']}
			onCellClick={({ id }) => navigate(`${paths.inventoryStockIn}/${id}`)}
		/>
	)
}

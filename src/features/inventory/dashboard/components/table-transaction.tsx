import CardV1 from '@/shared/components/common/card-v1'
import { DataTable } from '@/shared/components/common/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { ActivityIcon } from 'lucide-react'

export default function TableTransaction() {
	const column: ColumnDef<any>[] = [
		{
			id: 'transactionType',
			header: 'Tipe',
		},
		{
			id: 'item',
			header: 'Barang',
		},
		{
			id: 'qty',
			header: 'Qty',
		},
		{
			id: 'date',
			header: 'Tanggal',
		},
		{
			id: 'action',
		},
	]

	return (
		<CardV1
			title='Aktivitas'
			icon={<ActivityIcon size={20} className='text-ink-primary' />}
			style={{ content: 'pt-4' }}
		>
			<DataTable
				columns={column}
				data={[]}
				withPagination
				autoRedirect
				nonClickableColumns={['transactionType', 'item', 'qty', 'date']}
			/>
		</CardV1>
	)
}

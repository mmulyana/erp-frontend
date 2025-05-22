import { ActivityIcon, ExternalLink } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'

import CardV1 from '@/shared/components/common/card-v1'
import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import { RefType, StockLedger } from '@/shared/types/api'
import { paths } from '@/shared/constants/paths'
import { DateRange } from '@/shared/types'

import { useLedgerActivity } from '../api/use-ledger-activity'

export default function TableTransaction({ startDate, endDate }: DateRange) {
	const { limit, page, q } = usePagination()

	const { data } = useLedgerActivity({
		endDate: endDate?.toString(),
		startDate: startDate?.toString(),
		limit,
		page,
		search: q,
	})

	const links = {
		STOCK_IN: paths.inventoryStockIn,
		STOCK_OUT: paths.inventoryStockOut,
		LOAN: paths.inventoryStockLoan,
		RETURNED: paths.inventoryStockLoan,
	}

	const column: ColumnDef<StockLedger>[] = [
		{
			id: 'transactionType',
			header: 'Tipe',
			cell: ({ row }) => <TypeLedger type={row.original.type} />,
		},
		{
			id: 'item',
			header: 'Barang',
			cell: ({ row }) => row.original.inventory.name,
		},
		{
			id: 'qty',
			header: 'Qty',
			accessorKey: 'quantity',
		},
		{
			id: 'date',
			header: 'Tanggal',
			cell: ({ row }) =>
				row.original.date &&
				format(new Date(row.original.date), 'PPP', { locale: id }),
		},
		{
			id: 'action',
			cell: ({ row }) => (
				<Link
					to={`${links[row.original.type]}/${row.original.referenceId}`}
					className='flex gap-2 items-center'
				>
					<span className='px-0.5'>Lihat</span>
					<ExternalLink size={16} />
				</Link>
			),
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
				data={data?.data.data || []}
				withPagination
				totalItems={data?.data.total}
				totalPages={data?.data.total_pages}
				autoRedirect
				nonClickableColumns={['transactionType', 'item', 'qty', 'date']}
			/>
		</CardV1>
	)
}

function TypeLedger({ type }: { type: RefType }) {
	const label = {
		STOCK_IN: 'Stok masuk',
		STOCK_OUT: 'Stok keluar',
		LOAN: 'Peminjaman',
		RETURNED: 'Dikembalikan',
	}
	const color = {
		STOCK_IN: '#47AF97',
		STOCK_OUT: '#D52B42',
		LOAN: '#EE682F',
		RETURNED: '#414FCE',
	}

	return (
		<div className='flex gap-2 items-center'>
			<div
				className='w-1.5 h-1.5 rounded-full'
				style={{ background: color[type] }}
			></div>
			<span className='text-nowrap'>{label[type]}</span>
		</div>
	)
}

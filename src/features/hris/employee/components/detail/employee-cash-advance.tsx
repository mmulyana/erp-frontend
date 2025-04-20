import { ColumnDef } from '@tanstack/react-table'
import { Ellipsis, Wallet } from 'lucide-react'
import { format } from 'date-fns'

import SearchV3 from '@/shared/components/common/search-v3'
import { DataTable } from '@/shared/components/common/data-table'
import { Button } from '@/shared/components/ui/button'
import { formatToRupiah } from '@/shared/utils'

import ChartCashAdvance from './chart-cash-advance'

const data = [
	{
		amount: 40000,
		requestDate: new Date(),
		note: 'Sakit',
	},
	{
		amount: 40000,
		requestDate: new Date(),
		note: 'Sakit',
	},
	{
		amount: 40000,
		requestDate: new Date(),
		note: 'Sakit',
	},
	{
		amount: 40000,
		requestDate: new Date(),
		note: 'Sakit',
	},
	{
		amount: 40000,
		requestDate: new Date(),
		note: 'Sakit',
	},
	{
		amount: 40000,
		requestDate: new Date(),
		note: 'Sakit',
	},
	{
		amount: 40000,
		requestDate: new Date(),
		note: 'Sakit',
	},
	{
		amount: 40000,
		requestDate: new Date(),
		note: 'Sakit',
	},
	{
		amount: 40000,
		requestDate: new Date(),
		note: 'Sakit',
	},
	{
		amount: 40000,
		requestDate: new Date(),
		note: 'Sakit',
	},
]

export default function EmployeeCashAdvance() {
	const columns: ColumnDef<any>[] = [
		{
			id: 'amount',
			header: 'Jumlah',
			cell: ({ row }) => formatToRupiah(row.original.amount),
		},
		{
			id: 'requestDate',
			header: 'Tanggal',
			cell: ({ row }) => format(row.original.requestDate, 'dd/MM/yyyy'),
		},
		{
			id: 'note',
			header: 'Keterangan',
			cell: ({ row }) => (
				<div className='flex justify-between items-center gap-4'>
					<p>{row.original.note}</p>
					<Button variant='outline'>
						<Ellipsis size={16} />
					</Button>
				</div>
			),
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
				data={data}
				columns={columns}
				totalPages={5}
				totalItems={20}
				withPagination
			/>
		</>
	)
}

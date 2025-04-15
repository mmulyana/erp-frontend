import { ColumnDef } from '@tanstack/react-table'
import { Ellipsis, Wallet } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'

import { formatToRupiah } from '@/shared/utils/formatCurrency'
import { DataTable } from '@/shared/component/data-table'
import SearchV3 from '@/shared/component/search-v3'

const data = [
	{
		hour: 40000,
		date: new Date(),
		note: 'OT SPB line 3',
	},
	{
		hour: 40000,
		date: new Date(),
		note: 'OT SPB line 3',
	},
	{
		hour: 40000,
		date: new Date(),
		note: 'OT SPB line 3',
	},
	{
		hour: 40000,
		date: new Date(),
		note: 'OT SPB line 3',
	},
	{
		hour: 40000,
		date: new Date(),
		note: 'OT SPB line 3',
	},
	{
		hour: 40000,
		date: new Date(),
		note: 'OT SPB line 3',
	},
	{
		hour: 40000,
		date: new Date(),
		note: 'OT SPB line 3',
	},
	{
		hour: 40000,
		date: new Date(),
		note: 'OT SPB line 3',
	},
	{
		hour: 40000,
		date: new Date(),
		note: 'OT SPB line 3',
	},
	{
		hour: 40000,
		date: new Date(),
		note: 'OT SPB line 3',
	},
]

export default function EmployeeOvertime() {
	const columns: ColumnDef<any>[] = [
		{
			id: 'hour',
			header: 'Jam',
			cell: ({ row }) => row.original.hour,
		},
		{
			id: 'date',
			header: 'Tanggal',
			cell: ({ row }) => format(row.original.date, 'dd/MM/yyyy'),
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

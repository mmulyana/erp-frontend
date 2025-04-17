import { DataTable } from '@/shared/components/data-table'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'
import { ColumnDef } from '@tanstack/react-table'
import { Check, X } from 'lucide-react'

const data = [
	{
		fullname: 'Ikmal',
		position: 'staff',
		hour: 4,
		note: 'ot wwtp 2',
	},
	{
		fullname: 'Kelvin',
		position: 'staff',
		hour: 4,
		note: '',
	},
	{
		fullname: 'Rania',
		position: 'staff',
		hour: 2,
		note: 'ot spinning line 3',
	},
]

export default function TableOvertime() {
	const columns: ColumnDef<any>[] = [
		{
			accessorKey: 'fullname',
			header: 'Nama lengkap',
		},
		{
			accessorKey: 'position',
			header: 'Jabatan',
		},
		{
			accessorKey: 'hour',
			header: 'Jumlah jam',
		},
		{
			accessorKey: 'note',
			header: 'Keterangan',
		},
	]
	return (
		<DataTable
			columns={columns}
			data={data}
			totalItems={10}
			totalPages={2}
			withPagination
			variant='rounded-bordered'
		/>
	)
}

import { DataTable } from '@/shared/components/data-table'
import { ColumnDef } from '@tanstack/react-table'

export default function TableRegular() {
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
			id: 'status',
			header: 'Status',
		},
	]
	return <DataTable columns={columns} data={[]} variant='rounded-bordered'/>
}

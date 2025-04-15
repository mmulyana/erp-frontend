import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'

import SearchV3 from '@/shared/component/search-v3'
import { Ellipsis, File, FileText, Plus, FileBadgeIcon} from 'lucide-react'
import { DataTable } from '@/shared/component/data-table'

const data = [
	{
		name: 'K3 Umum',
	},
	{
		name: 'Safety',
	},
	{
		name: 'Safety',
	},
	{
		name: 'Safety',
	},
	{
		name: 'Safety',
	},
	{
		name: 'Safety',
	},
	{
		name: 'Safety',
	},
	{
		name: 'Safety',
	},
	{
		name: 'Safety',
	},
	{
		name: 'Safety',
	},
]

export default function EmployeeCertificate() {
	const columns: ColumnDef<any>[] = [
		{
			id: 'name',
			header: 'Nama',
			cell: ({ row }) => (
				<div className='flex justify-between items-center'>
					<div className='flex gap-4 items-center'>
						<FileText size={24} className='text-ink-light' />
						<p className='text-ink-secondary'>{row.original.name}</p>
					</div>
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
				<FileBadgeIcon className='text-ink-secondary' />
				<p className='text-ink-secondary font-medium'>Sertifikasi</p>
			</div>
			<div className='px-4 py-3 bg-surface flex justify-between items-center border-t border-border'>
				<div className='flex gap-4 items-center'>
					<SearchV3 />
				</div>
				<Button className='gap-2'>
					<Plus strokeWidth={2} size={16} className='text-white' />
					<span className='px-0.5'>Tambah Sertifikasi</span>
				</Button>
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

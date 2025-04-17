import { DataTable } from '@/shared/components/data-table'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'
import { ColumnDef } from '@tanstack/react-table'
import { Check, X } from 'lucide-react'

const data = [
	{
		fullname: 'Ikmal',
		position: 'staff',
		status: 'present',
	},
	{
		fullname: 'Kelvin',
		position: 'staff',
		status: 'absent',
	},
	{
		fullname: 'Rania',
		position: 'staff',
		status: null,
	},
]

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
			cell: ({ row }) => {
				const isPresent = row.original.status === 'present'
				const isAbsent = row.original.status === 'absent'

				return (
					<div className='flex gap-2 items-center'>
						<Button
							variant='outline'
							className={cn(
								'group',
								isPresent &&
									'bg-success border-success hover:bg-teal-600 hover:border-teal-800'
							)}
						>
							<Check
								size={18}
								strokeWidth={3}
								className={cn('text-success ', isPresent && 'text-white')}
							/>
							<span
								className={cn(
									'px-0.5 text-sm text-ink-secondary',
									isPresent && 'text-white'
								)}
							>
								Hadir
							</span>
						</Button>
						<Button
							variant='outline'
							className={cn(
								isAbsent && 'bg-error border-error hover:bg-red-400'
							)}
						>
							<X
								size={18}
								strokeWidth={3}
								className={cn('text-error', isAbsent && 'text-white')}
							/>
							<span
								className={cn(
									'px-0.5 text-sm text-ink-secondary',
									isAbsent && 'text-white'
								)}
							>
								Absen
							</span>
						</Button>
					</div>
				)
			},
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

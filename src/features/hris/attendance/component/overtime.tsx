import { ColumnDef } from '@tanstack/react-table'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'
import { useState } from 'react'

import ProtectedComponent from '@/shared/component/protected'
import { DataTable } from '@/shared/component/data-table'
import { Button } from '@/components/ui/button'

import FilterReset from './filter-reset'
import FilterDate from './filter-date'
import { AddOvertime } from './add-overtime'

export function Overtime() {
	// COLUMNS
	const columnOvertime: ColumnDef<any>[] = [
		{
			accessorKey: 'fullname',
			header: 'Nama',
			cell: ({ cell }) => {
				return <p>{cell.row.original.employee.fullname}</p>
			},
		},
		{
			id: 'jabatan',
			header: 'Jabatan',
			cell: ({ cell }) => {
				return <p>{cell.row.original.employee.position?.name}</p>
			},
		},
		{
			id: 'total_hour',
			header: () => <p className='text-center'>Jumlah jam</p>,
			cell: ({ cell }) => (
				<div className='w-[72px]'>
					<p className='text-center'>{cell.row.original.total_hour}</p>
				</div>
			),
		},
		{
			id: 'date',
			header: 'Tanggal',
			cell: ({ cell }) => (
				<div className='w-[88px]'>
					<p>
						{format(cell.row.original.date, 'dd MMM yyyy', {
							locale: id,
						})}
					</p>
				</div>
			),
		},
		{
			id: 'description',
			header: 'Keterangan',
			cell: ({ cell }) => (
				<div className='w-[200px]'>
					<p>{cell.row.original.description}</p>
				</div>
			),
		},
		{
			id: 'action',
			cell: ({ row }) => <div className='flex justify-end w-full'></div>,
		},
	]

	const [dialog, setDialog] = useState<{
		open: boolean
		id: number | null
	} | null>(null)

	return (
		<>
			<div className='flex justify-between items-start p-4 bg-[#F9FAFB] gap-2'>
				<div className='flex gap-4 flex-wrap'>
					<FilterDate />
					<FilterReset />
				</div>
				<ProtectedComponent required={['overtime:create']}>
					<Button onClick={() => setDialog({ open: true, id: null })}>
						Tambah
					</Button>
				</ProtectedComponent>
			</div>
			<DataTable columns={columnOvertime} data={[]} />
			<AddOvertime
				open={dialog?.open || false}
				setOpen={() => setDialog(null)}
				id={dialog?.id}
			/>
		</>
	)
}

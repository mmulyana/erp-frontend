import { parseAsString, parseAsTimestamp, useQueryStates } from 'nuqs'
import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/shared/components/common/data-table'

import { useOvertimes } from '../../api/overtime/use-overtimes'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useState } from 'react'
import ModalDetailOvertime from './modal-detail-overtime'
import { Overtime } from '@/shared/types/api'

export default function TableOvertime() {
	const [open, setOpen] = useState(false)
	const [selected, setSelected] = useState('')

	const { limit, page, q, sortOrder, sortBy } = usePagination()

	const [query] = useQueryStates({
		date: parseAsTimestamp,
		projectId: parseAsString.withDefault(''),
		position: parseAsString.withDefault(''),
	})

	const date = new Date(query.date || Date.now())
	date.setHours(0, 0, 0, 0)
	const startDate = date.toString()

	const { data, isLoading } = useOvertimes({
		limit,
		page,
		search: q,
		startDate,
		sortBy,
		sortOrder,
		position: query.position,
		projectId: query.projectId,
	})

	const columns: ColumnDef<Overtime>[] = [
		{
			accessorKey: 'fullname',
			header: 'Nama lengkap',
		},
		{
			accessorKey: 'position',
			header: 'Jabatan',
		},
		{
			accessorKey: 'totalHour',
			header: 'Jumlah jam',
		},
		{
			accessorKey: 'note',
			header: 'Keterangan',
		},
		{
			header: 'Proyek',
			cell: ({ row }) => row.original?.project?.name,
		},
	]
	return (
		<>
			<DataTable
				columns={columns}
				data={data?.data.data || []}
				totalItems={data?.data.total}
				totalPages={data?.data.total_pages}
				withPagination
				onCellClick={(e) => {
					setSelected(e.id)
					setOpen(true)
				}}
				nonClickableColumns={[]}
				isLoading={isLoading}
				autoRedirect
			/>
			<ModalDetailOvertime id={selected} open={open} setOpen={setOpen} />
		</>
	)
}

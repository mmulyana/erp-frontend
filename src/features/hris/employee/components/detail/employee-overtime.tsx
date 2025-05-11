import { ColumnDef } from '@tanstack/react-table'
import { useParams } from 'react-router-dom'
import { FilePen } from 'lucide-react'
import { id } from 'date-fns/locale'
import { useSetAtom } from 'jotai'
import { format } from 'date-fns'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import SearchV3 from '@/shared/components/common/search-v3'

import ModalDetailOvertime, {
	atomModalOvertime,
} from '@/features/hris/attendance/components/overtime/modal-detail-overtime'
import { Overtime } from '@/features/hris/attendance/types'

import { useDataOvertime } from '../../api/use-data-overtime'

export default function EmployeeOvertime() {
	const { q, limit, page } = usePagination()
	const { id: employeeId } = useParams()

	// atom in component
	const setModal = useSetAtom(atomModalOvertime)

	const { data } = useDataOvertime({
		search: q,
		limit,
		page,
		id: employeeId,
	})

	const columns: ColumnDef<Overtime>[] = [
		{
			id: 'hour',
			header: 'Jumlah jam',
			cell: ({ row }) => row.original?.totalHour,
		},
		{
			id: 'date',
			header: 'Tanggal',
			cell: ({ row }) => format(row.original.date, 'PPP', { locale: id }),
		},
		{
			id: 'note',
			header: 'Keterangan',
			accessorKey: 'note',
		},
	]

	return (
		<div className='px-6 space-y-6 pt-6'>
			<div className='flex gap-2 items-center'>
				<FilePen className='text-ink-secondary' />
				<p className='text-ink-secondary font-medium'>Lembur</p>
			</div>

			<div className='flex justify-between items-center gap-4'>
				<SearchV3 />
			</div>
			<DataTable
				data={data?.data?.data || []}
				columns={columns}
				totalPages={data?.data.total_pages}
				totalItems={data?.data.total}
				withPagination
				autoRedirect
				nonClickableColumns={[]}
				onCellClick={({ id }) => {
					setModal({
						id,
						open: true,
					})
				}}
			/>
			<ModalDetailOvertime />
		</div>
	)
}

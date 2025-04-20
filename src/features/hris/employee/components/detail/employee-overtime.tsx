import { ColumnDef } from '@tanstack/react-table'
import { Ellipsis, FilePen, Wallet } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import SearchV3 from '@/shared/components/common/search-v3'
import { Button } from '@/shared/components/ui/button'

import { useDataOvertime } from '../../api/use-data-overtime'
import { Overtime } from '@/features/hris/_types'
import { id } from 'date-fns/locale'
import { useSetAtom } from 'jotai'
import ModalDetailOvertime, {
	atomModalOvertime,
} from '@/features/hris/attendance/components/overtime/modal-detail-overtime'

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
		<>
			<div className='flex gap-2 items-center p-6'>
				<FilePen className='text-ink-secondary' />
				<p className='text-ink-secondary font-medium'>Lembur</p>
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
				data={data?.data?.data || []}
				columns={columns}
				totalPages={data?.data.total_pages}
				totalItems={data?.data.total}
				withPagination
				nonClickableColumns={[]}
				onCellClick={({ id }) => {
					setModal({
						id,
						open: true,
					})
				}}
				autoRedirect
			/>
			<ModalDetailOvertime />
		</>
	)
}

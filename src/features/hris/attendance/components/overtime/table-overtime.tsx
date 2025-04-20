import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { ColumnDef } from '@tanstack/react-table'
import { useSetAtom } from 'jotai'

import { DataTable } from '@/shared/components/common/data-table'
import { useCurrentDate } from '@/shared/hooks/use-current-date'
import { useDateIndex } from '@/shared/hooks/use-date-index'

import { useOvertimes } from '../../api/overtime/use-overtimes'
import { atomModalOvertime } from '../overtime/modal-detail-overtime'
import { usePagination } from '@/shared/hooks/use-pagination'

export default function TableOvertime() {
	const { limit, page, q } = usePagination()
	const { month, date } = useCurrentDate()

	const setModal = useSetAtom(atomModalOvertime)
	const [query] = useQueryStates({
		date: parseAsInteger.withDefault(0),
		month: parseAsInteger.withDefault(month),
	})

	const { resultDate } = useDateIndex({
		indexDate: query.date > 0 ? query.date : date,
		indexMonth: query.month,
	})

	const { data, isLoading } = useOvertimes({
		limit,
		page,
		search: q,
		startDate: resultDate.toString(),
	})

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
			accessorKey: 'totalHour',
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
			data={data?.data.data || []}
			totalItems={data?.data.total}
			totalPages={data?.data.total_pages}
			withPagination
			variant='rounded-bordered'
			onCellClick={(e) => {
				setModal({
					id: e.id,
					open: true,
				})
			}}
			nonClickableColumns={[]}
			isLoading={isLoading}
			autoRedirect
		/>
	)
}

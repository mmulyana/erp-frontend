import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { ColumnDef } from '@tanstack/react-table'
import { useSetAtom } from 'jotai'

import { useCurrentDate } from '@/shared/hooks/use-current-date'
import { useDateIndex } from '@/shared/hooks/use-date-index'
import { DataTable } from '@/shared/components/data-table'

import { useOvertimes } from '../api/use-overtimes'
import { ModalOvertime } from './modal-detail-overtime'

export default function TableOvertime() {
	const setModal = useSetAtom(ModalOvertime)

	const { month } = useCurrentDate()

	const [query] = useQueryStates({
		date: parseAsInteger.withDefault(0),
		month: parseAsInteger.withDefault(month),

		// for pagination
		q: parseAsString.withDefault(''),
		page: parseAsString.withDefault('1'),
		limit: parseAsString.withDefault('10'),
	})

	const { resultDate } = useDateIndex({
		indexDate: query.date > 0 ? query.date : new Date().getDate(),
		indexMonth: query.month,
	})

	const { data, isLoading } = useOvertimes({
		limit: query.limit,
		page: query.page,
		search: query.q,
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

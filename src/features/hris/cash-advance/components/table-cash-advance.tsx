import { parseAsIsoDate, parseAsString, useQueryStates } from 'nuqs'
import { ColumnDef } from '@tanstack/react-table'
import { useSetAtom } from 'jotai'
import { format } from 'date-fns'

import { DataTable } from '@/shared/components/common/data-table'
import { formatToRupiah } from '@/shared/utils'

import { ModalCashAdvance } from './modal-detail-cash-advance'
import { useCashAdvances } from '../api/use-cash-advances'
import { CashAdvance } from '../types'
import { id } from 'date-fns/locale'

export default function TableCashAdvance() {
	const setModal = useSetAtom(ModalCashAdvance)

	const [query] = useQueryStates({
		q: parseAsString.withDefault(''),
		page: parseAsString.withDefault('1'),
		limit: parseAsString.withDefault('10'),
		startDate: parseAsIsoDate.withDefault(new Date()),
		endDate: parseAsIsoDate.withDefault(new Date()),
	})

	const { data, isLoading } = useCashAdvances({
		limit: query.limit,
		page: query.page,
		search: query.q,
	})

	const columns: ColumnDef<CashAdvance>[] = [
		{
			id: 'fullname',
			header: 'Nama lengkap',
			cell: ({ row }) => row.original.employee?.fullname,
		},
		{
			id: 'amount',
			header: 'Jumlah',
			cell: ({ row }) => formatToRupiah(row.original.amount),
		},
		{
			id: 'requestDate',
			header: 'Tanggal',
			cell: ({ row }) =>
				format(new Date(row.original.date), 'dd MMMM yyyy', { locale: id }),
		},
		{
			id: 'note',
			header: 'Keterangan',
			accessorKey: 'note',
		},
	]
	return (
		<>
			<DataTable
				columns={columns}
				data={data?.data.data || []}
				withPagination
				totalItems={data?.data.total}
				totalPages={data?.data.total_pages}
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
		</>
	)
}

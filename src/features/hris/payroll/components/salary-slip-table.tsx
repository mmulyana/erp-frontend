import { parseAsString, useQueryStates } from 'nuqs'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import { formatThousands } from '@/shared/utils'
import { Payroll } from '@/shared/types/api'

import { usePayrolls } from '../api/use-payrolls'

export default function SalarySlipTable() {
	const { page, limit, q, sortBy, sortOrder } = usePagination()

	const [query] = useQueryStates({
		periodId: parseAsString.withDefault(''),
	})

	const { data } = usePayrolls({
		page,
		limit,
		search: q,
		status: 'done',
		periodId: query.periodId,
		sortBy,
		sortOrder,
	})

	const column: ColumnDef<
		Payroll & { pariodName?: string; salary?: number }
	>[] = [
		{
			header: 'Name',
			cell: ({ row }) => row.original.employee.fullname,
		},
		{
			header: 'Periode',
			cell: ({ row }) => row.original?.period?.name,
		},
		{
			header: 'Tanggal diproses',
			cell: ({ row }) =>
				row.original.doneAt &&
				format(new Date(row.original.doneAt), 'dd/MM/yyyy'),
		},
		{
			header: 'Gaji diterima',
			cell: ({ row }) => `Rp ${formatThousands(row.original?.salary)}`,
		},
		{
			id: 'action',
		},
	]

	return (
		<DataTable
			columns={column}
			data={data?.data.data || []}
			withPagination
			totalItems={data?.data.total}
			totalPages={data?.data.total_pages}
		/>
	)
}

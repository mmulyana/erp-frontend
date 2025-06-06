import { ColumnDef } from '@tanstack/react-table'
import { House, Pencil } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

import ModalProcessPayroll from '@/features/hris/payroll/components/modal-process-payroll'
import PayrollDetailTotal from '@/features/hris/payroll/components/payroll-detail-total'
import PayrollProgress from '@/features/hris/payroll/components/payroll-progress'
import { usePayrolls } from '@/features/hris/payroll/api/use-payrolls'
import { usePeriod } from '@/features/hris/payroll/api/use-period'

import CreateSelect from '@/shared/components/common/select/created-select'
import BaseSelect from '@/shared/components/common/select/base-select'
import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import SearchV3 from '@/shared/components/common/search-v3'
import DetailLayout from '@/shared/layout/detail-layout'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import { Payroll, PayrollStatus } from '@/shared/types/api'
import { Button } from '@/shared/components/ui/button'
import { useDynamicLinks } from '@/shared/utils/link'
import { Badge } from '@/shared/components/ui/badge'
import { Link, selectOption } from '@/shared/types'
import { formatThousands } from '@/shared/utils'
import { paths } from '@/shared/constants/paths'
import { cn } from '@/shared/utils/cn'
import ModalDetailPayroll from '@/features/hris/payroll/components/modal-detail-payroll'

const links: Link[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.hris,
		hideName: true,
	},
	{
		name: 'Payroll',
		path: paths.hrisPayroll,
	},
	{
		name: 'Detail',
		path: paths.hrisPayroll,
	},
]
const statusOptions: selectOption[] = [
	{
		label: 'Selesai',
		value: 'done',
	},
	{
		label: 'Draf',
		value: 'draft',
	},
]
const createdOptions: selectOption[] = [
	{
		label: 'Tanggal Selesai (Terbaru)',
		value: 'doneAt:asc',
	},
	{
		label: 'Tanggal Selesai (Terlama)',
		value: 'doneAt:desc',
	},
]
export default function PayrolleDetail() {
	const { id } = useParams()
	const [open, setOpen] = useState(false)
	const { limit, page, q, sortBy, sortOrder, status } = usePagination()

	const { data } = usePeriod({ id })
	const { data: payrolls } = usePayrolls({
		limit,
		page,
		search: q,
		periodId: id,
		enabled: id !== null && id !== undefined && id !== '',
		sortBy,
		sortOrder,
		status,
	})

	const linkMemo = useDynamicLinks({
		baseLinks: links,
		replaceName: 'Detail',
		newLink: data?.data
			? {
					name: data.data.name ?? '',
					path: `${paths.hrisPayroll}/${data.data.id}`,
			  }
			: undefined,
		condition: !!(id && data?.data),
	})

	const column: ColumnDef<Payroll & { salary: number }>[] = [
		{
			header: 'Nama',
			cell: ({ row }) => row.original.employee.fullname,
		},
		{
			header: 'Hari kerja',
			accessorKey: 'workDay',
		},
		{
			header: 'Lembur (jam)',
			accessorKey: 'overtimeHour',
		},
		{
			header: 'Potongan',
			accessorKey: 'deduction',
			cell: ({ row }) => `Rp ${formatThousands(row.original.deduction)}`,
		},
		{
			header: 'Catatan',
			accessorKey: 'note',
			cell: ({ row }) => row.original.note && row.original.note.split('|')[0],
		},
		{
			id: 'total',
			header: 'Gaji diterima',
			cell: ({ row }) => `Rp ${formatThousands(row.original.salary)}`,
		},
		{
			header: 'Status',
			cell: ({ row }) => {
				const isDone = row.original.status === PayrollStatus.DONE
				return (
					<Badge variant='outline' className='gap-1'>
						<div
							className={cn(
								'h-1.5 w-1.5 rounded-full',
								isDone ? 'bg-success' : 'bg-[#4795EF]'
							)}
						></div>
						<p
							className={cn(
								'text-sm text-nowrap',
								isDone ? 'text-success' : 'text-[#4795EF]'
							)}
						>
							{isDone ? 'Selesai' : 'Draf'}
						</p>
					</Badge>
				)
			},
		},
		{
			id: 'action',
			header: '',
			cell: ({ row }) => {
				const isDone = row.original.status === PayrollStatus.DONE

				return (
					<ModalProcessPayroll
						id={row.original.id}
						employeeId={row.original.employeeId}
						startDate={data?.data?.startDate}
						endDate={data?.data?.endDate}
						variant={isDone ? 'update' : 'default'}
					/>
				)
			},
		},
	]

	return (
		<DetailLayout
			links={linkMemo}
			buttonAction={<ModalDetailPayroll />}
			style={{
				header: 'w-[1072px]',
			}}
		>
			<div className='mx-auto w-[1072px] max-w-full px-6 lg:px-0 pt-6 space-y-6'>
				<div className='flex gap-4 flex-col md:flex-row'>
					<PayrollProgress />
					<PayrollDetailTotal />
				</div>
				<div className='p-6 rounded-xl border border-border bg-white space-y-6'>
					<div className='flex gap-4 flex-wrap md:flex-nowrap'>
						<SearchV3 />
						<div className='flex gap-4 ml-0 md:ml-auto'>
							<FilterButton>
								<BaseSelect
									label='Status'
									options={statusOptions}
									urlName='status'
								/>
							</FilterButton>
							<SortButton>
								<CreateSelect options={createdOptions} />
							</SortButton>
						</div>
					</div>
					<DataTable
						columns={column}
						data={payrolls?.data.data || []}
						totalItems={payrolls?.data.total}
						totalPages={payrolls?.data.total_pages}
						withPagination
					/>
				</div>
			</div>
		</DetailLayout>
	)
}

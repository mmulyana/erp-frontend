import { ExternalLink, HardHat } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { statusBadges } from '@/features/projects/project/constant/types'

import StatusBadge from '@/shared/components/common/status-badge'
import SearchV3 from '@/shared/components/common/search-v3'
import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import { AssignedEmployee } from '@/shared/types/api'
import { paths } from '@/shared/constants/paths'

import { useEmployeeProject } from '../../api/use-employee-project'

export default function EmployeeProject() {
	const { limit, page, q, sortBy, sortOrder } = usePagination()
	const { id } = useParams()

	const { data } = useEmployeeProject({
		employeeId: id,
		limit,
		page,
		search: q,
		sortBy,
		sortOrder,
	})
	console.log('data', data)

	const column: ColumnDef<AssignedEmployee>[] = [
		{
			header: 'Nama',
			cell: ({ row }) => (
				<Link
					to={`${paths.projectMasterdataProjects}/${row.original.projectId}`}
					className='flex gap-2 items-center'
				>
					{row.original.project.name}
					<span className='px-0.5'>Lihat</span>
					<ExternalLink size={16} className='ml-0.5' />
				</Link>
			),
		},
		{
			header: 'Tggl Mulai',
			cell: ({ row }) => format(new Date(row.original.startDate), 'dd/MM/yyyy'),
		},
		{
			header: 'Tggl Berakhir',
			cell: ({ row }) =>
				row.original.endDate &&
				format(new Date(row.original.endDate), 'dd/MM/yyyy'),
		},
		{
			header: 'Status',
			cell: ({ row }) => (
				<StatusBadge
					options={statusBadges}
					value={row.original.project.status}
				/>
			),
		},
	]

	return (
		<>
			<div className='flex gap-2 items-center p-6'>
				<HardHat className='text-ink-secondary' />
				<p className='text-ink-secondary font-medium'>Proyek</p>
			</div>
			<div className='px-6 pb-4 flex justify-between items-center'>
				<div className='border-l border-border flex flex-col pl-2 justify-center'>
					<p className='text-ink-light text-sm'>Total Proyek</p>
					<p className='text-ink-primary font-medium'>{data?.data?.total}</p>
				</div>
				<div className='flex gap-4'>
					<SearchV3 />
				</div>
			</div>
			<div className='px-6'>
				<DataTable
					data={data?.data?.data || []}
					withPagination
					columns={column}
					totalItems={data?.data?.total}
					totalPages={data?.data?.total_pages}
				/>
			</div>
		</>
	)
}

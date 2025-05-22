import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import { paths } from '@/shared/constants/paths'

import { useProjects } from '../api/use-projects'
import { Project } from '@/shared/types/api'
import PhotoUrl from '@/shared/components/common/photo-url'
import Priority from './priority'
import ProgressPercentage from '@/shared/components/common/progress-percentage'
import CircularProgress from '@/shared/components/common/circular-progress'
import StatusBadge from '@/shared/components/common/status-badge'
import { statusBadges } from '../constant/types'

export default function TableProject() {
	const { limit, page, q } = usePagination()
	const navigate = useNavigate()

	const { isLoading, data } = useProjects({
		limit,
		page,
		search: q,
	})

	// COLUMNS EMPLOYEE
	const columns: ColumnDef<Project>[] = [
		{
			id: 'name',
			accessorKey: 'name',
			header: 'Nama',
		},
		{
			id: 'client',
			header: 'Klien',
			cell: ({ row }) => (
				<p className='text-ink-primary'>
					{row.original.client?.name}{' '}
					{row.original.client?.company && (
						<span className='opacity-60'>({row.original.client.name})</span>
					)}
				</p>
			),
		},
		{
			id: 'lead',
			header: 'Penanggung Jwb',
			cell: ({ row }) => {
				if (!row.original.lead) return null
				return (
					<div className='flex gap-2 items-center'>
						<PhotoUrl
							style={{ img: 'h-7 w-7', icon: 'h-4 w-4' }}
							url={row.original.lead?.photoUrl || ''}
						/>
						<p className='text-ink-primary'>{row.original.lead?.username}</p>
					</div>
				)
			},
		},
		{
			id: 'priority',
			header: 'Prioritas',
			cell: ({ row }) => <Priority value={row.original.priority as string} />,
		},
		{
			id: 'progress',
			header: 'Progress',
			cell: ({ row }) => <CircularProgress progress={row.original.progressPercentage} />,
		},
		{
			id: 'status',
			header: 'Status',
			cell: ({ row }) => (
				<StatusBadge options={statusBadges} value={row.original.status} />
			),
		},
	]
	// COLUMNS

	return (
		<>
			<DataTable
				columns={columns}
				data={data?.data.data || []}
				isLoading={isLoading}
				autoRedirect
				totalItems={data?.data.total}
				totalPages={data?.data.total_pages}
				withPagination
				nonClickableColumns={[]}
				onCellClick={({ id }) =>
					navigate(`${paths.projectMasterdataProjects}/${id}`)
				}
			/>
		</>
	)
}

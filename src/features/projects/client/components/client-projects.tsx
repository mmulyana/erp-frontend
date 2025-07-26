import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import { HardHat } from 'lucide-react'

import { usePagination } from '@/shared/hooks/use-pagination'
import { DataTable } from '@/shared/components/common/data-table'
import { paths } from '@/shared/constants/paths'
import { Project } from '@/shared/types/api'

import StatusBadge from '@/shared/components/common/status-badge'
import SearchV3 from '@/shared/components/common/search-v3'
import CardV1 from '@/shared/components/common/card-v1'

import { useProjects } from '../../project/api/use-projects'
import { statusBadges } from '../../project/constant/types'

export default function ClientProjects({ id }: { id?: string }) {
	const navigate = useNavigate()

	const { limit, page, q, sortBy, sortOrder, status } = usePagination()
	const { data } = useProjects({
		clientId: id,
		limit,
		page,
		search: q,
		sortBy,
		sortOrder,
		status,
	})

	const column: ColumnDef<Project>[] = [
		{
			id: 'name',
			header: 'Nama',
			accessorKey: 'name',
		},
		{
			id: 'status',
			header: 'Status',
			cell: ({ row }) => (
				<StatusBadge options={statusBadges} value={row.original.status} />
			),
		},
	]

	return (
		<CardV1
			title='Proyek'
			icon={<HardHat size={20} className='text-ink-primary' />}
			count={data?.data.total}
			action={<SearchV3 />}
			style={{ content: 'pt-6' }}
		>
			<DataTable
				columns={column}
				data={data?.data.data || []}
				totalItems={data?.data.total}
				totalPages={data?.data.total_pages}
				nonClickableColumns={[]}
				withPagination
				autoRedirect
				onCellClick={({ id }) =>
					navigate(`${paths.projectMasterdataProjects}/${id}`)
				}
			/>
		</CardV1>
	)
}

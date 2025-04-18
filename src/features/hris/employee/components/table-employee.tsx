import { parseAsString, useQueryStates } from 'nuqs'
import { ColumnDef } from '@tanstack/react-table'
import { useAtomValue } from 'jotai'
import { format } from 'date-fns'

import { DataTable } from '@/shared/components/common/data-table'
import { permissionAtom } from '@/shared/store/permission'
import { testIds } from '@/shared/constants/testId'
import { Employee } from '@/shared/types'
import Overlay from '@/components/common/overlay'

import { useEmployees } from '@/features/hris/employee/api/use-employees'

export default function TableEmployee() {
	const permission = useAtomValue(permissionAtom)

	const isAllowed = permission?.includes('employee:detail')

	const [query, setQuery] = useQueryStates({
		q: parseAsString.withDefault(''),
		page: parseAsString.withDefault('1'),
		limit: parseAsString.withDefault('10'),
	})

	const { isLoading, data } = useEmployees({
		limit: query.limit,
		page: query.page,
		search: query.q,
	})

	// COLUMNS EMPLOYEE
	const columns: ColumnDef<Employee>[] = [
		{
			id: 'fullname',
			accessorKey: 'fullname',
			header: 'Nama lengkap',
			cell: ({ row }) => {
				const { fullname } = row.original
				return (
					<div
						className='max-w-[160px]'
						id={`${testIds.detailEmployee}-${row.index + 1}`}
						data-testid={`${testIds.detailEmployee}-${row.index + 1}`}
					>
						<Overlay
							className='w-fit pr-14'
							overlay={
								isAllowed && (
									<button
										onClick={() => {}}
										className='absolute right-0 top-1/2 -translate-y-1/2 text-sm text-[#313951] py-1 px-2 rounded-[6px] border border-[#EFF0F2] bg-white hover:shadow-sm hover:shadow-gray-200'
									>
										Lihat
									</button>
								)
							}
						>
							<div className='hover:text-dark'>
								<button
									onClick={() => {
										if (isAllowed) {
										}
									}}
									disabled={!isAllowed}
									className='justify-start flex'
								>
									<span className='break-words max-w-[120px] text-left'>
										{fullname}
									</span>
								</button>
							</div>
						</Overlay>
					</div>
				)
			},
		},
		{
			id: 'joined_at',
			accessorKey: 'joinedAt',
			header: 'Bergabung sejak',
			cell: ({ row }) =>
				row.original.joinedAt && (
					<p>{format(row.original.joinedAt, 'dd MMMM yyyy')}</p>
				),
		},
		{
			id: 'position',
			accessorKey: 'position',
			header: 'Jabatan',
		},
		{
			id: 'last_education',
			accessorKey: 'lastEducation',
			header: 'Pend terakhir',
		},
		{
			id: 'phone',
			accessorKey: 'phone',
			header: 'Nomor telp',
		},
		{
			id: 'status',
			accessorKey: 'status',
			header: 'Status',
			// cell: ({ row }) => (
			// 	<Chips status={row.original.} className='rounded-full' />
			// ),
		},
	]
	// COLUMNS

	return (
		<>
			<DataTable
				columns={columns}
				data={data?.data.data || []}
				isLoading={isLoading}
				autoRedirect={isAllowed}
				totalItems={data?.data.total}
				totalPages={data?.data.total_pages}
				withPagination
				// onCellClick={({ id }) => {}}
			/>
		</>
	)
}

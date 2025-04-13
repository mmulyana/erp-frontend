import { ColumnDef } from '@tanstack/react-table'
import { useAtomValue } from 'jotai'

import { DataTable } from '@/shared/component/data-table'
import Overlay from '@/components/common/overlay'
import Chips from '@/components/common/chips'

import { permissionAtom } from '@/shared/store/permission'

import { useEmployees } from '@/features/hris/employee/api/use-employees'

import { EDUCATIONS_OBJ } from '@/utils/data/educations'
import { testIds } from '@/utils/constant/_testId'
import { Employee } from '@/utils/types/api'

import { parseAsString, useQueryStates } from 'nuqs'

export default function TableEmployee() {
	const permission = useAtomValue(permissionAtom)

	const isAllowed = permission?.includes('employee:detail')

	const [query, setQuery] = useQueryStates({
		q: parseAsString.withDefault(''),
	})

	const { isLoading, data } = useEmployees()

	// COLUMNS EMPLOYEE
	const columns: ColumnDef<Employee>[] = [
		{
			id: 'fullname',
			accessorKey: 'fullname',
			header: 'Nama lengkap',
			cell: ({ row }) => {
				const { fullname, id } = row.original
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
			accessorKey: 'joined_at',
			header: 'Bergabung sejak',
		},
		{
			id: 'position',
			accessorKey: 'position',
			header: 'Jabatan',
		},
		{
			id: 'last_education',
			accessorKey: 'last_education',
			header: 'Pend terakhir',
			cell: ({ row }) => (
				<p>{EDUCATIONS_OBJ[row.original.last_education as string]}</p>
			),
		},
		{
			id: 'phone_number',
			accessorKey: 'phone_number',
			header: 'Nomor telp',
		},
		{
			id: 'status',
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => (
				<Chips status={row.original.status} className='rounded-full' />
			),
		},
	]
	// COLUMNS

	return (
		<>
			<DataTable
				columns={columns}
				data={[]}
				withPagination
				isLoading={isLoading}
				// totalPages={data?.total_pages || 0}
				autoRedirect={isAllowed}
				// onCellClick={({ id }) => {}}
			/>
		</>
	)
}

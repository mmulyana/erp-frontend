import { useQueryClient } from '@tanstack/react-query'
import { parseAsString, useQueryStates } from 'nuqs'
import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

import CreatedSelect from '@/shared/components/common/select/created-select'
import ToggleSwitch from '@/shared/components/common/toggle-switch'
import FilterReset from '@/shared/components/common/filter-reset'
import SortButton from '@/shared/components/common/sort-button'
import SearchV3 from '@/shared/components/common/search-v3'
import { DataTable } from '@/shared/components/common/data-table'
import { useHasQueryValue } from '@/shared/hooks/use-has-query'
import { usePagination } from '@/shared/hooks/use-pagination'
import { Employee, selectOption } from '@/shared/types'
import { paths } from '@/shared/constants/paths'
import { keys } from '@/shared/constants/keys'
import { formatPhone } from '@/shared/utils'

import { useEmployees } from '@/features/hris/employee/api/use-employees'

import { useUpdateEmployee } from '../api/use-update-employee'
import FilterEmployee from './filter-employee'

const dateOptions: selectOption[] = [
	{
		label: 'Tggl bergabung (Terlama)',
		value: 'joinedAt:asc',
	},
	{
		label: 'Tggl bergabung (Terbaru)',
		value: 'joinedAt:desc',
	},
]

export default function TableEmployee() {
	const navigate = useNavigate()
	const { page, limit, q, sortBy, sortOrder } = usePagination()

	const [query, setQuery] = useQueryStates({
		active: parseAsString.withDefault(''),
		lastEdu: parseAsString.withDefault(''),
		position: parseAsString.withDefault(''),
		sort: parseAsString.withDefault(''),
	})

	const hasValue = useHasQueryValue(query)

	const queryClient = useQueryClient()
	const { mutate } = useUpdateEmployee()

	const { isLoading, data } = useEmployees({
		limit,
		page,
		search: q,
		lastEdu: query.lastEdu,
		position: query.position,
		sortBy,
		sortOrder,
		active: query.active,
	})

	// COLUMNS EMPLOYEE
	const columns: ColumnDef<Employee>[] = [
		{
			id: 'fullname',
			accessorKey: 'fullname',
			header: 'Nama lengkap',
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
			cell: ({ row }) => row.original.lastEducation.toUpperCase(),
		},
		{
			id: 'phone',
			accessorKey: 'phone',
			header: 'Nomor telp',
			cell: ({ row }) =>
				row.original.phone && formatPhone(row?.original?.phone),
		},
		{
			id: 'status',
			accessorKey: 'active',
			header: 'Status',
			cell: ({ row }) => (
				<div className='w-[120px]'>
					<ToggleSwitch
						value={row.original.active}
						label={{ true: 'Aktif', false: 'Nonaktif' }}
						onCheck={(val) => {
							mutate(
								{ id: row.original.id, active: val },
								{
									onSuccess: () => {
										queryClient.invalidateQueries({
											queryKey: [keys.employeeReportData],
										})
									},
								}
							)
						}}
					/>
				</div>
			),
		},
	]
	// COLUMNS

	return (
		<div className='p-6 rounded-2xl bg-white border border-border space-y-6'>
			<div className='flex gap-4 items-center flex-wrap'>
				<SearchV3 />
				<FilterReset
					show={hasValue}
					onClick={() => {
						setQuery({
							lastEdu: null,
							position: null,
							sort: null,
							active: null,
						})
					}}
				/>
				<FilterEmployee />
				<SortButton>
					<CreatedSelect options={dateOptions} />
				</SortButton>
			</div>
			<DataTable
				columns={columns}
				data={data?.data.data || []}
				isLoading={isLoading}
				autoRedirect
				totalItems={data?.data.total}
				totalPages={data?.data.total_pages}
				withPagination
				nonClickableColumns={['status']}
				onCellClick={({ id }) =>
					navigate(`${paths.hrisMasterdataEmployee}/${id}`)
				}
			/>
		</div>
	)
}

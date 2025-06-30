import { useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'

import ToggleSwitch from '@/shared/components/common/toggle-switch'
import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import PhotoUrl from '@/shared/components/common/photo-url'
import { keys } from '@/shared/constants/keys'
import { User } from '@/shared/types/api'

import { useUpdateUser } from '../api/use-update-user'
import ModalEditUser from './modal-edit-user'
import { useUsers } from '../api/use-users'
import DialogResetPassword from './dialog-reset-password'
import ProtectedComponent from '@/shared/components/common/protected'
import { permissions } from '@/shared/constants/permissions'

export default function TableUser() {
	const queryClient = useQueryClient()
	const { mutate } = useUpdateUser()

	const { limit, page, q, sortBy, sortOrder } = usePagination()

	const { data } = useUsers({
		limit,
		page,
		search: q,
		sortBy,
		sortOrder,
	})

	const column: ColumnDef<User>[] = [
		{
			id: 'username',
			header: 'username',
			cell: ({ row }) => (
				<div className='flex gap-2 items-center py-2'>
					<PhotoUrl
						url={row.original.photoUrl || ''}
						style={{ img: 'h-8 w-8' }}
					/>
					<p className='text-ink-primary'>{row.original.username}</p>
				</div>
			),
		},
		{
			id: 'email',
			header: 'Email',
			accessorKey: 'email',
		},
		{
			id: 'phone',
			header: 'No. Telp',
			accessorKey: 'phone',
		},
		{
			id: 'role',
			header: 'Role',
			cell: ({ row }) => row.original.role?.name,
		},
		{
			id: 'status',
			header: 'Status',
			cell: ({ row }) => (
				<div className='w-[120px]'>
					<ProtectedComponent required={[permissions.user_update]}>
						<ToggleSwitch
							value={row.original.active}
							label={{ true: 'Aktif', false: 'Nonaktif' }}
							onCheck={(val) => {
								mutate(
									{ id: row.original.id, active: val },
									{
										onSuccess: () => {
											queryClient.invalidateQueries({
												queryKey: [keys.user],
											})
										},
									}
								)
							}}
						/>
					</ProtectedComponent>
				</div>
			),
		},
		{
			id: 'action',
			cell: ({ row }) => (
				<div className='flex gap-4 items-center'>
					<ProtectedComponent required={[permissions.user_reset_password]}>
						<DialogResetPassword id={row.original.id} />
					</ProtectedComponent>
					<ProtectedComponent required={[permissions.user_update]}>
						<ModalEditUser id={row.original.id} />
					</ProtectedComponent>
				</div>
			),
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

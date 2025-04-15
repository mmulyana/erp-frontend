import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { UserCircle } from 'lucide-react'
import { useAtomValue } from 'jotai'
import { useState } from 'react'

import usePermission from '@/shared/hooks/use-permission'
import useTour from '@/shared/hooks/use-tour'
import { useApiData } from '@/shared/hooks/use-api-data'

import { userAtom } from '@/shared/store/auth'

import { formatPhone } from '@/shared/utils/format-phone'
import { testIds } from '@/shared/constants/_testId'
import { baseUrl } from '@/shared/constants/_urls'
import { paths } from '@/shared/constants/_paths'

import { FilterTable, HeadTable } from '@/shared/component/data-table/component'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DataTable } from '@/shared/component/data-table'
import { Button } from '@/components/ui/button'
import AlertDialogV1 from '@/components/common/alert-dialog-v1'
import DropdownEdit from '@/components/common/dropdown-edit'
import ProtectedComponent from '@/components/protected'
import Tour from '@/components/common/tour'

import AddUserRole from '@/features/user/components/add-user-role'
import tourUser from '@/features/user/components/tour-user'
import AddUser from '@/features/user/components/add-user'
import { useResetPassword } from '@/features/user/api/use-reset-password'
import { useDeactiveUser } from '@/features/user/api/use-deactive-user'
import { useActiveUser } from '@/features/user/api/use-active-user'
import { useDeleteUser } from '@/features/user/api/use-delete-user'
import { useUsers } from '@/features/user/api/use-users'

export default function Index() {
	const permission = usePermission()

	// handle tour
	const tours = useTour('user')

	const { mutate: activate } = useActiveUser()
	const { mutate: deactivate } = useDeactiveUser()

	// HANDLE DELETE
	const [openDelete, setOpenDelete] = useState<{
		id: string | null
		open: boolean
	}>({ id: null, open: false })
	const { mutate: remove } = useDeleteUser()

	// HANDLE RESET PASSWORD
	const { mutate: reset } = useResetPassword()
	const [resetPassword, setResetPassword] = useState<{
		id: string
		name: string
		open: boolean
	} | null>(null)

	// HANDLE DIALOG NEW USER
	const [dialog, setDialog] = useState<{
		id: string | null
		open: boolean
	} | null>(null)

	const [url] = useUrlState({ page: '', name: '', limit: '' })
	const { data, isLoading } = useApiData(
		useUsers({ page: url.page, search: url.name, limit: url.limit })
	)
	const column: ColumnDef<any>[] = [
		{
			id: 'name',
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }) => (
				<div className='flex gap-2 items-center w-[160px]'>
					{row.original.photoUrl ? (
						<img
							src={baseUrl + '/upload/' + row.original.photoUrl}
							className='w-6 h-6 rounded-full flex-shrink-0'
						/>
					) : (
						<div className='w-6 h-6 rounded-full flex-shrink-0 bg-blue-primary/5 flex items-center justify-center'>
							<p className='text-blue-primary leading-none uppercase font-medium'>
								{row.original.username.at(0)}
							</p>
						</div>
					)}
					<p className='text-dark'>{row.original.username}</p>
				</div>
			),
		},
		{
			id: 'email',
			header: 'Email',
			accessorKey: 'email',
			cell: ({ row }) => (
				<div className='w-[140px]'>
					<p>{row.original?.email}</p>
				</div>
			),
		},
		{
			id: 'phone',
			header: 'No Telp',
			cell: ({ row }) => (
				<div className='w-[120px]'>
					{row.original.phone && <p>{formatPhone(row.original.phone)}</p>}
				</div>
			),
		},
		{
			id: 'status',
			header: 'Status',
		},
		{
			id: 'role',
			header: 'Akses',
			cell: ({ row }) => (
				<div
					id={`${testIds.buttonAddRole}-${row.index + 1}`}
					data-testid={`${testIds.buttonAddRole}-${row.index + 1}`}
				>
					<AddUserRole
						id={row.original.id}
						roleId={row.original.role && row.original.role.id}
						permission={permission}
					/>
				</div>
			),
		},
		{
			id: 'action',
			cell: ({ row }) => (
				<div className='flex justify-end items-center gap-4'>
					<ProtectedComponent required={['user:reset-password']}>
						<Button
							variant='outline'
							className='py-1 h-fit'
							size='sm'
							onClick={() =>
								setResetPassword({
									id: row.original.id,
									name: row.original.username,
									open: true,
								})
							}
							id={`${testIds.buttonReset}-${row.index + 1}`}
							data-testid={`${testIds.buttonReset}-${row.index + 1}`}
						>
							Reset Password
						</Button>
					</ProtectedComponent>
					<ProtectedComponent
						required={['user:activate', 'user:update', 'user:delete']}
					>
						<DropdownEdit className='-translate-x-3'>
							<ProtectedComponent required={['user:activate']}>
								<DropdownMenuItem
									onClick={() => {
										if (row.original.active) {
											deactivate({ id: row.original.id })
										} else {
											activate({ id: row.original.id })
										}
									}}
								>
									{row.original.active ? 'Nonaktifkan' : 'Aktifkan'}
								</DropdownMenuItem>
							</ProtectedComponent>
							<ProtectedComponent required={['user:update']}>
								<DropdownMenuItem
									onClick={() => setDialog({ id: row.original.id, open: true })}
								>
									Edit
								</DropdownMenuItem>
							</ProtectedComponent>
							<ProtectedComponent required={['user:delete']}>
								<DropdownMenuItem
									onClick={() =>
										setOpenDelete({ id: row.original.id, open: true })
									}
								>
									Hapus
								</DropdownMenuItem>
							</ProtectedComponent>
						</DropdownEdit>
					</ProtectedComponent>
				</div>
			),
		},
	]

	return (
		<>
			<HeadTable>
				<div className='flex gap-4 items-center'>
					<UserCircle className='text-[#989CA8]' />
					<p className='text-dark font-medium'>User</p>
				</div>
				<ProtectedComponent required={['user:create']}>
					<Button
						onClick={() => setDialog({ open: true, id: null })}
						id={testIds.buttonAddUser}
						data-testid={testIds.buttonAddUser}
					>
						User Baru
					</Button>
				</ProtectedComponent>
			</HeadTable>
			<FilterTable />
			<DataTable
				columns={column}
				data={[]}
				isLoading={isLoading}
				withPagination
			/>
			<AlertDialogV1
				open={resetPassword?.open || false}
				setOpen={() => setResetPassword(null)}
				body={`Akun milik ${resetPassword?.name} akan direset ulang, password baru: "password"`}
				title='Reset Password'
				className='bg-blue-primary'
				onConfirm={() => resetPassword?.id && reset({ id: resetPassword?.id })}
			/>
			<AddUser
				open={dialog?.open || false}
				setOpen={() => setDialog(null)}
				id={dialog?.id}
			/>
			<AlertDialogV1
				title='Hapus akun'
				body='Akun ini akan dihapus dari sistem'
				cancelText='Batal'
				className='bg-destructive'
				confirmText='Hapus'
				onConfirm={() => openDelete?.id && remove({ id: openDelete?.id })}
				open={openDelete?.open}
				setOpen={() => setOpenDelete({ id: null, open: false })}
			/>

			<Tour steps={tourUser} name='user' />
		</>
	)
}

import { ColumnDef } from '@tanstack/react-table'
import useUrlState from '@ahooksjs/use-url-state'
import { UserCircle } from 'lucide-react'
import { useState } from 'react'

import { useDeleteRole } from '@/features/role/api/use-delete-role'
import { useRoles } from '@/features/role/api/use-roles'
import AddPermission from '@/features/role/component/add-permission'
import tourRole from '@/features/role/component/tour-role'
import AddRole from '@/features/role/component/add-role'

import { useApiData } from '@/shared/hooks/use-api-data'
import { testIds } from '@/utils/constant/_testId'
import { paths } from '@/utils/constant/_paths'

import AlertDialogV1 from '@/components/common/alert-dialog-v1'
import DropdownEdit from '@/components/common/dropdown-edit'
import Tour from '@/components/common/tour'

import { FilterTable, HeadTable } from '@/shared/component/data-table/component'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DataTable } from '@/shared/component/data-table'
import { Button } from '@/components/ui/button'

import { useTitle } from '@/shared/store/title'
import ProtectedComponent from '@/components/protected'
import { Role } from '@/features/role/type'

export default function Index() {
	const { mutate: remove } = useDeleteRole()

	const [url] = useUrlState({ name: '' })

	// HANDLE DIALOG NEW USER
	const [openDialog, setOpenDialog] = useState<{
		id: string | null
		open: boolean
	} | null>(null)

	const [openPermission, setOpenPermission] = useState<{
		id: string | null
		open: boolean
	} | null>(null)

	const [openDelete, setOpenDelete] = useState<{
		id: string
		open: boolean
	} | null>(null)

	const { data, isLoading } = useApiData(useRoles({ search: url.name }))
	const column: ColumnDef<Role>[] = [
		{
			id: 'name',
			accessorKey: 'name',
			header: 'Name',
		},
		{
			id: 'description',
			header: 'Deskripsi',
			accessorKey: 'description',
		},
		{
			id: 'action',
			cell: ({ row }) => (
				<div className='flex justify-end items-center gap-4'>
					<ProtectedComponent
						required={['role:permission-update', 'role:update', 'role:delete']}
					>
						<DropdownEdit className='-translate-x-3'>
							<ProtectedComponent required={['role:permission-update']}>
								<DropdownMenuItem
									onClick={() =>
										setOpenPermission({ id: row.original.id, open: true })
									}
								>
									Hak istimewa
								</DropdownMenuItem>
							</ProtectedComponent>
							<ProtectedComponent required={['role:update']}>
								<DropdownMenuItem
									onClick={() =>
										setOpenDialog({ id: row.original.id, open: true })
									}
								>
									Edit
								</DropdownMenuItem>
							</ProtectedComponent>
							<ProtectedComponent required={['role:delete']}>
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
					<p className='text-dark font-medium'>Peran</p>
				</div>
				<ProtectedComponent required={['role:create']}>
					<Button
						onClick={() => setOpenDialog({ id: null, open: true })}
						id={testIds.buttonCreateRole}
						data-testid={testIds.buttonCreateRole}
					>
						Peran Baru
					</Button>
				</ProtectedComponent>
			</HeadTable>
			<FilterTable />
			<DataTable columns={column} data={[]} isLoading={isLoading} />
			<AddRole
				open={openDialog?.open || false}
				setOpen={() => setOpenDialog(null)}
				id={openDialog?.id}
			/>
			<AddPermission
				open={openPermission?.open || false}
				setOpen={() => setOpenPermission(null)}
				id={openPermission?.id}
			/>
			<AlertDialogV1
				title='Hapus peran'
				body='Peran ini akan dihapus dari sistem'
				cancelText='Batal'
				className='bg-destructive'
				confirmText='Hapus'
				onConfirm={() => openDelete?.id && remove({ id: openDelete?.id })}
				open={openDelete?.open || false}
				setOpen={() => setOpenDelete(null)}
			/>

			<Tour steps={tourRole} name='role' />
		</>
	)
}

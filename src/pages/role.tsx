import { ColumnDef } from '@tanstack/react-table'
import { UserCircle } from 'lucide-react'
import { useState } from 'react'

import { useDeleteRole } from '@/features/role/api/use-delete-role'
import { useRoles } from '@/features/role/api/use-roles'
import AddPermission from '@/features/role/component/add-permission'
import tourRole from '@/features/role/component/tour-role'
import AddRole from '@/features/role/component/add-role'

import { useApiData } from '@/shared/hooks/use-api-data'
import { testIds } from '@/shared/constants/_testId'
import { paths } from '@/shared/constants/_paths'

import AlertDialogV1 from '@/components/common/alert-dialog-v1'
import DropdownEdit from '@/components/common/dropdown-edit'
import Tour from '@/components/common/tour'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DataTable } from '@/shared/component/data-table'
import { Button } from '@/components/ui/button'

import { useTitle } from '@/shared/store/title'
import ProtectedComponent from '@/shared/component/protected'
import { Role } from '@/features/role/type'

export default function Index() {
	const { mutate: remove } = useDeleteRole()

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
			<DataTable columns={column} data={[]} />
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

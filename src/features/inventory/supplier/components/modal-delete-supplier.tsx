import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

import { Button } from '@/shared/components/ui/button'
import { paths } from '@/shared/constants/paths'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog'

import { useDeleteSupplier } from '../api/use-delete-supplier'

export default function ModalDeleteSupplier() {
	const navigate = useNavigate()

	const { mutate } = useDeleteSupplier()
	const { id } = useParams()

	const [open, setOpen] = useState(false)

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button
					variant='ghost'
					className='text-error hover:text-white hover:bg-error px-2.5'
					type='button'
				>
					Hapus Supplier
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Yakin ingin menghapus supplier ini?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Tindakan ini tidak dapat dibatalkan. Hubungi admin jika tidak
						sengaja terhapus.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Batal</AlertDialogCancel>
					<AlertDialogAction
						className='bg-error'
						onClick={() => {
							if (!id) return
							
							mutate(
								{ id },
								{
									onSuccess: () => {
										setOpen(false)
										navigate(paths.inventoryMasterdataSupplier, {
											replace: true,
										})
									},
								}
							)
						}}
					>
						Hapus
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

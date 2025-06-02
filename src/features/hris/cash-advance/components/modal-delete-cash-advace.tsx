import { useAtom } from 'jotai'

import { Button } from '@/shared/components/ui/button'
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

import { useDeleteCashAdvance } from '../api/use-delete-cash-advance'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ModalDeleteCashAdvance() {
	const [open, setOpen] = useState(false)

	const { id } = useParams()
	const { mutate } = useDeleteCashAdvance()

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button
					variant='ghost'
					className='text-error hover:text-white hover:bg-error px-2.5'
					type='button'
				>
					Hapus kasbon
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Yakin ingin menghapus kasbon ini?</AlertDialogTitle>
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
							if (id) {
								mutate(
									{ id },
									{
										onSuccess: () => {
											setOpen(false)
										},
									}
								)
							}
						}}
					>
						Hapus
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

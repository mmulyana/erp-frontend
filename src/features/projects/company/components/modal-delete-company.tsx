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

import { useDeleteCompany } from '../api/use-delete-company'
import { atomModalCompany } from './modal-detail-company'

export default function ModalDeleteCompany() {
	const [modal, setModal] = useAtom(atomModalCompany)

	const { mutate } = useDeleteCompany()

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant='ghost'
					className='text-error hover:text-white hover:bg-error px-2.5'
					type='button'
				>
					Hapus Perusahaan
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Yakin ingin menghapus perusahaan ini?
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
							if (modal?.id) {
								mutate(
									{ id: modal.id },
									{
										onSuccess: () => {
											setModal(null)
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

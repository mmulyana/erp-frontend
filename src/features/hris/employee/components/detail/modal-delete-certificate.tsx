import { useParams } from 'react-router-dom'
import { Trash } from 'lucide-react'
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

import { useDeleteCertificate } from '../../api/use-delete-certificate'
import { atomModalCertificate } from './modal-detail-certificate'

export default function ModalDeleteCertificate() {
	const [modal, setModal] = useAtom(atomModalCertificate)
	const { mutate } = useDeleteCertificate()
	const { id: employeeId } = useParams()

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant='ghost'
					className='text-error hover:text-white hover:bg-error group gap-1'
					type='button'
				>
					<Trash size={18} className='text-error group-hover:text-white' />
					<span className='px-0.5 '>Hapus</span>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Yakin ingin menghapus sertifikasi ini?
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
							if (modal?.id && employeeId) {
								mutate(
									{ id: modal.id, employeeId },
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

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

import { useDeleteLocation } from '../api/use-delete-location'

type props = {
	setOpen: (val: boolean) => void
	id?: string
}
export default function ModalDeleteLocation({ setOpen, id }: props) {
	const { mutate } = useDeleteLocation()

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant='ghost'
					className='text-error hover:text-white hover:bg-error px-2.5'
					type='button'
				>
					Hapus Lokasi
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Yakin ingin menghapus lokasi ini?</AlertDialogTitle>
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

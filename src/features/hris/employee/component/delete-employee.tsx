import { buttonVariants } from '@/components/ui/button'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { delay } from '@/utils/delay'
import { cn } from '@/utils/cn'

import { useDeleteEmployee } from '../api/use-delete-employee'

type ModalProps = {
	id?: number | null
	open: boolean
	setOpen: (val: boolean) => void
}
export default function DeleteEmployee({ id, open, setOpen }: ModalProps) {
	const { mutate } = useDeleteEmployee()
	const onDelete = async () => {
		if (!id) return
		mutate(
			{ id },
			{
				onSuccess: () => {
					delay(400).then(() => setOpen(false))
				},
			}
		)
	}
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Hapus pegawai</AlertDialogTitle>
					<AlertDialogDescription>
						Pegawai ini akan dihapus dari sistem
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setOpen(false)}>
						Batal
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={onDelete}
						className={cn(buttonVariants({ variant: 'destructive' }))}
					>
						Lanjutkan
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

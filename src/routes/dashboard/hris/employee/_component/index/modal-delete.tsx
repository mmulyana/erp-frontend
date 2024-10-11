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
import { buttonVariants } from '@/components/ui/button'
import { useDeletePosition } from '@/hooks/api/use-position'
import { cn } from '@/utils/cn'
import { delay } from '@/utils/delay'

type ModalProps = {
  id?: number
  open: boolean
  setOpen: (val: boolean) => void
}
export default function ModalDelete({ id, open, setOpen }: ModalProps) {
  const { mutate } = useDeletePosition()
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
          <AlertDialogTitle>Hapus posisi ini?</AlertDialogTitle>
          <AlertDialogDescription>
            Posisi ini akan dihapus dari database
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

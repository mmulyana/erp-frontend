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
import { useDeleteCashAdvances } from '@/features/hris/cash-advance/api/use-cash-advance'
import { cn } from '@/utils/cn'
import { delay } from '@/utils/delay'

type ModalProps = {
  id?: number | null
  open: boolean
  setOpen: (val: boolean) => void
}
export default function ModalDelete({ id, open, setOpen }: ModalProps) {
  const { mutate } = useDeleteCashAdvances()
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
          <AlertDialogTitle>Hapus data ini?</AlertDialogTitle>
          <AlertDialogDescription>
            Data ini akan dihapus dari database
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

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
import { useDeleteClient } from '@/hooks/api/use-client'
import { cn } from '@/utils/cn'
import { delay } from '@/utils/delay'

type ModalProps = {
  id?: number | null
  open: boolean
  setOpen: (val: boolean) => void
}
export default function DialogDeleteClient({ id, open, setOpen }: ModalProps) {
  const { mutate } = useDeleteClient()
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
          <AlertDialogTitle>Hapus user ini?</AlertDialogTitle>
          <AlertDialogDescription>
            User ini akan dihapus dari database
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

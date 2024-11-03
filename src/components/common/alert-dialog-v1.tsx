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
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '../ui/button'

type TProps = {
  open?: boolean
  setOpen?: (value: boolean) => void
  title?: string
  body?: string
  onConfirm?: () => void
  cancelText?: string
  confirmText?: string
}
export default function AlertDialogV1({
  open = false,
  setOpen,
  title = 'Apakah kamu yakin?',
  body = 'Aksi ini tidak dapat dibatalkan, setelah kamu memilih melakukan konfirmasi',
  onConfirm,
  cancelText,
  confirmText,
}: TProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{body}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              if (setOpen) {
                setOpen(false)
              }
            }}
          >
            {cancelText ?? 'Batal'}
          </AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={() => {
              if (onConfirm) {
                onConfirm()
              }
            }}
          >
            {confirmText ?? 'Lanjutkan'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

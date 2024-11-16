import { atom, useAtom } from 'jotai'
import { useDeleteTransaction } from '@/hooks/api/use-transaction'
import AlertDialogV1 from '@/components/common/alert-dialog-v1'

export const dialogDeleteTransaction = atom<{
  id: number
  open: boolean
} | null>(null)

export default function DeleteTransaction() {
  const { mutate } = useDeleteTransaction()

  const [dialog, setDialog] = useAtom(dialogDeleteTransaction)

  return (
    <AlertDialogV1
      open={dialog?.open}
      setOpen={() => setDialog(null)}
      title='Hati-hati! Tindakan ini tidak bisa dibatalkan'
      body='Data transaksi akan dihapus dalam sistem dan dikembalikan ke nilai sebelumnya'
      onConfirm={() => {
        if (!dialog?.id) return
        mutate({ id: dialog?.id }, { onSuccess: () => setDialog(null) })
      }}
    />
  )
}

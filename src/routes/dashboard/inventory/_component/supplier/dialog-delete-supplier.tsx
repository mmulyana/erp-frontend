import Modal from '@/components/modal-v2'
import { Button } from '@/components/ui/button'
import { useDeleteSupplier } from '@/hooks/api/use-supplier'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id: number | null
  setId: (val: number | null) => void
}
export default function DialogDeleteSupplier({
  open,
  setOpen,
  id,
  setId,
}: Props) {
  // HANDLE DELETE
  const { mutate: deleteSupplier } = useDeleteSupplier()

  const onDelete = () => {
    if (!id) return

    deleteSupplier(
      { id },
      {
        onSuccess: () => {
          setId(null)
          setOpen(false)
        },
      }
    )
  }

  return (
    <Modal title='Hapus supplier' open={open} setOpen={setOpen}>
      <div className='p-4 space-y-4'>
        Tindakan akan ini akan menghapus supplier serta pegawai dan lainnya
      </div>
      <div className='rounded-b-md px-4 py-4 bg-[#F4F4F7] border-t border-[#EFF0F2] flex justify-end gap-2 items-center'>
        <Button
          type='button'
          variant='secondary'
          onClick={() => {
            setOpen(false)
            setId(null)
          }}
        >
          Batal
        </Button>
        <Button variant='destructive' onClick={onDelete}>
          Hapus
        </Button>
      </div>
    </Modal>
  )
}

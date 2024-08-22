import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  useCheckPermission,
  useDeletePermission,
} from '@/hooks/use-permission'
import { delay } from '@/utils/delay'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

// id for permission group
type Props = {
  id?: number
  idGroup?: number
  open: boolean
  setOpen: (val: boolean) => void
}

const TEXT = {
  TITLE: 'Hapus perizinan',
  BODY: '',
}

export default function DeleteModalPermission(props: Props) {
  const { mutate, isPending } = useDeletePermission(props.idGroup)
  const { data, isLoading } = useCheckPermission(props.id)
  const [warning, setWarning] = useState(false)

  async function handleDelete() {
    if (!props.id) toast('Silahkan pilih perizinan lagi')

    mutate(props.id, {
      onSuccess: () => {
        toast('Perizinan ini berhasil dihapus')
        delay(600).then(() => props.setOpen(false))
      },
      onError: (error) => {
        toast(error.message)
      },
    })
  }

  useEffect(() => {
    setWarning(false)
  }, [])

  const isSaveToDelete =
    !isLoading && !data?.data.data.count_role && !data?.data.data.count_account

  if (!props.open) return null

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className='px-4 !sm:max-w-[calc(100%-16px)] max-w-[400px] rounded-xl'>
        <DialogHeader>
          <DialogTitle>{TEXT.TITLE}</DialogTitle>
          <DialogDescription>{TEXT.BODY}</DialogDescription>
        </DialogHeader>
        <div>
          {isSaveToDelete ? (
            <>
              <p className='text-center text-gray-500'>
                Menghapus izin ini aman dilakukan dan tidak akan berdampak pada
                role dan akun manapun
              </p>
              <div className='flex justify-end w-full mt-4'>
                <Button variant='destructive' onClick={handleDelete}>
                  {isPending ? 'loading' : 'Hapus'}
                </Button>
              </div>
            </>
          ) : (
            <>
              {warning ? (
                <>
                  <p className='text-center text-gray-800'>
                    Role yang akan kehilangan akses perizinan ini
                  </p>
                  <div className='flex justify-center gap-1 flex-wrap mt-2 text-sm'>
                    {data?.data.data.roleNames.map(
                      (name: string, index: number) => (
                        <span className='text-gray-400'>
                          {name}{' '}
                          {index === data?.data.data.roleNames.length - 1
                            ? null
                            : ','}
                        </span>
                      )
                    )}
                    <div className='mt-4 grid grid-cols-2 gap-2 w-full'>
                      <Button
                        className='w-full'
                        variant='secondary'
                        onClick={() => props.setOpen(false)}
                      >
                        Batal
                      </Button>
                      <Button
                        className='w-full'
                        variant='destructive'
                        onClick={handleDelete}
                      >
                        {isPending ? 'loading' : 'Hapus'}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className='text-center text-gray-800'>
                    Menghapus izin ini akan menyebabkan kehilangan akses pada{' '}
                    <span className='font-bold'>
                      {data?.data.data.count_role}
                    </span>{' '}
                    role dan{' '}
                    <span className='font-bold'>
                      {data?.data.data.count_account}
                    </span>{' '}
                    akun
                  </p>

                  <div className='flex justify-end w-full mt-4'>
                    <Button
                      variant='destructive'
                      onClick={() => setWarning(true)}
                    >
                      Hapus
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

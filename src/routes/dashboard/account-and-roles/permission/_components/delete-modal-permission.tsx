import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { useEffect, useState } from 'react'

type Props = {
  id?: number
  open: boolean
  setOpen: (val: boolean) => void
}

type Response = {
  count_role: number
  count_account: number
  roleNames: string[]
}

const TEXT = {
  TITLE: 'Hapus perizinan ini',
  BODY: '',
}

export default function DeleteModalPermission(props: Props) {
  const [data, setData] = useState<Response>({
    count_account: 0,
    count_role: 0,
    roleNames: [],
  })

  async function checkPermission(id?: number) {
    if (!id) return
    const response = await http(`${URLS.PERMISSION_CHECK}/${id}`)
    setData(response.data.data)
    // console.log(response)
  }

  useEffect(() => {
    console.log('id', props.id)
    if (props.open && !!props.id) checkPermission(props.id)
  }, [props.open, props.id])

  console.log(data)

  if (!props.open) return null

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className='px-4'>
        <DialogHeader>
          <DialogTitle>{TEXT.TITLE}</DialogTitle>
          <DialogDescription>{TEXT.BODY}</DialogDescription>
        </DialogHeader>
        <div>
          <p className='text-lg text-center text-gray-800'>
            Menghapus izin ini akan berdampak pada{' '}
            <span className='font-bold'>{data.count_role}</span> role dan{' '}
            <span className='font-bold'>{data.count_account}</span> akun
          </p>
          <p className='text-sm text-gray-500 text-center'>
            {data.roleNames.length > 0
              ? 'Role yang terdampat :' +
                data.roleNames.map(
                  (name: string, index: number) =>
                    `${name} ${index == data.roleNames.length - 1 ? '' : ','}`
                )
              : null}
          </p>
        </div>
        <div className='flex justify-end w-full'>
            <Button variant='destructive'>Hapus</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

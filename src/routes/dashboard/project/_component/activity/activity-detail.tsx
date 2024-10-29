import { useDeleteActivity, useDetailActivity } from '@/hooks/api/use-activity'
import MessageItem from './message-item'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  projectId?: number | null
  id?: number | null
}
export default function ActivityDetail({
  open,
  setOpen,
  projectId,
  id,
}: Props) {
  const { data } = useDetailActivity({
    enabled: !!id && !!projectId,
    projectId,
    id,
  })
  const { mutate: remove } = useDeleteActivity()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className='p-0 overflow-hidden'
        showClose={false}
        close={<CustomClose setOpen={setOpen} />}
      >
        <DialogHeader className='py-1 px-4 border'>
          <DialogTitle className='text-base font-normal'>Detail</DialogTitle>
        </DialogHeader>
        {data && data.data.data && (
          <MessageItem
            {...data?.data.data}
            withReplies
            onDelete={(id) => {
              remove({ id })
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

type CloseProps = {
  setOpen: (val: boolean) => void
}
function CustomClose({ setOpen }: CloseProps) {
  return (
    <div className='absolute top-0 right-2 h-8 flex items-center'>
      <button
        className='h-7 w-7 flex justify-center items-center rounded'
        onClick={() => setOpen(false)}
      >
        <X className='h-4 w-4' />
        <span className='sr-only'>Close</span>
      </button>
    </div>
  )
}

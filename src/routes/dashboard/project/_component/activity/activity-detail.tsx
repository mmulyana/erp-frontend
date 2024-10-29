import {
  useDeleteActivity,
  useDetailActivity,
  useRemovePhotoActivity,
  useToggleLikeActivity,
  useUpdateActivity,
  useUploadPhotosActivity,
} from '@/hooks/api/use-activity'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import MessageItem2 from './message-item-2'

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
  const { mutate: removeAttachment } = useRemovePhotoActivity()
  const { mutate: upload } = useUploadPhotosActivity()
  const { mutate: toggle } = useToggleLikeActivity()
  const { mutate: remove } = useDeleteActivity()
  const { mutate: update } = useUpdateActivity()

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
          <MessageItem2
            nameKey='detail'
            {...data?.data.data}
            onDelete={(id) => {
              remove({ id })
            }}
            onToggle={(userId, activityId) => {
              toggle({ activityId, userId })
            }}
            onUpdate={({ id, comment, newAttachments, deletedAttachments, reset }) => {
              if (!id) return
              update(
                {
                  id,
                  payload: {
                    comment: comment,
                  },
                },
                {
                  onSuccess: () => {
                    if (!!newAttachments.length) {
                      upload({ id, photos: newAttachments })
                    }
                    removeAttachment(deletedAttachments)
                    reset()
                  },
                }
              )
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

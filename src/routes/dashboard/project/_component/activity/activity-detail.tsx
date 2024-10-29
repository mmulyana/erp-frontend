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
import MessageForm from './message-form'
import { ScrollArea } from '@/components/ui/scroll-area'

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
        <div className='bg-white border-b border-dark/20'>
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
              onUpdate={({
                id,
                comment,
                newAttachments,
                deletedAttachments,
                reset,
              }) => {
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
                      if (!!deletedAttachments.length) {
                        removeAttachment(deletedAttachments)
                      }
                      reset()
                    },
                  }
                )
              }}
            />
          )}
          <ScrollArea className='h-56 px-2 bg-[#F5F5F5] relative'>
            <div className='w-full flex flex-col gap-4 pt-4 pb-10 px-2'>
              <MessageForm
                type='input'
                id={data?.data.data?.id}
                projectId={data?.data.data?.projectId}
              />
              {data &&
                data.data.data?.replies.map((reply) => (
                  <MessageItem2
                    hideReply
                    nameKey='detail-reply'
                    key={'detail-reply-' + reply.id}
                    {...reply}
                    onDelete={(id) => {
                      remove({ id })
                    }}
                    onToggle={(userId, activityId) => {
                      toggle({ activityId, userId })
                    }}
                    onUpdate={({
                      id,
                      comment,
                      newAttachments,
                      deletedAttachments,
                      reset,
                    }) => {
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
                            if (!!deletedAttachments.length) {
                              removeAttachment(deletedAttachments)
                            }
                            reset()
                          },
                        }
                      )
                    }}
                  />
                ))}
            </div>
          </ScrollArea>
        </div>
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

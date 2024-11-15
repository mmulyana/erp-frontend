import { useEffect, useState } from 'react'
import { socket } from '@/utils/socket'
import { JOIN_BY_PARENT, MESSAGES_BY_PARENT } from '@/utils/constant/_socket'
import {
  useDeleteActivity,
  useToggleLikeActivity,
  useUpdateActivity,
} from '@/hooks/api/use-activity'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import MessageItem2 from './message-item-2'
import MessageForm from './message-form'

import { X } from 'lucide-react'
import { Activity } from '@/utils/types/api'

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
  const [data, setData] = useState<Activity | null>(null)

  const { mutate: toggle } = useToggleLikeActivity()
  const { mutate: remove } = useDeleteActivity()
  const { mutate: update } = useUpdateActivity()

  useEffect(() => {
    if (!open) return

    socket.emit(JOIN_BY_PARENT, { id })

    socket.on(MESSAGES_BY_PARENT, (data: Activity) => {
      setData(data)
    })

    return () => {
      socket.off(MESSAGES_BY_PARENT)
    }
  }, [id, open])

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
          {data && (
            <MessageItem2
              nameKey='detail'
              {...data}
              onDelete={(id) => {
                remove({ id, type: 'detail' })
              }}
              onToggle={(userId, id) => {
                projectId &&
                  toggle({
                    id,
                    userId,
                    projectId,
                    type: 'detail',
                    replyId: data.id,
                  })
              }}
              onUpdate={({
                id,
                comment,
                photos,
                deletedAttachments,
                reset,
              }) => {
                if (!id) return
                update(
                  {
                    id,
                    payload: {
                      comment: comment,
                      photos: photos,
                      deletedPhoto: deletedAttachments,
                      type: 'detail',
                    },
                  },
                  {
                    onSuccess: () => {
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
                id={data?.id}
                projectId={data?.projectId}
              />
              {data &&
                data.replies?.map((reply: any) => (
                  <MessageItem2
                    hideReply
                    nameKey='detail-reply'
                    key={'detail-reply-' + reply.id}
                    {...reply}
                    onDelete={(id) => {
                      remove({ id, type: 'detail' })
                    }}
                    onToggle={(userId, id) => {
                      projectId &&
                        toggle({
                          id,
                          userId,
                          projectId,
                          type: 'detail',
                          replyId: data.id,
                        })
                    }}
                    onUpdate={({
                      id,
                      comment,
                      photos,
                      deletedAttachments,
                      reset,
                    }) => {
                      if (!id) return
                      update(
                        {
                          id,
                          payload: {
                            comment: comment,
                            photos: photos,
                            deletedPhoto: deletedAttachments,
                            type: 'detail',
                          },
                        },
                        {
                          onSuccess: () => {
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

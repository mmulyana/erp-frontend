import ActivityDetail from '../activity/activity-detail'
import {
  useDeleteActivity,
  useRemovePhotoActivity,
  useToggleLikeActivity,
  useUpdateActivity,
  useUploadPhotosActivity,
} from '@/hooks/api/use-activity'
import MessageForm from '../activity/message-form'
import { Activity } from '@/utils/types/api'
import { useState, useEffect } from 'react'
import MessageItem2 from '../activity/message-item-2'
import { socket } from '@/utils/socket'
import { JOIN_BY_PROJECT, MESSAGES_BY_PROJECT } from '@/utils/constant/_socket'

type Props = {
  id?: number | null
}
type SelectedActivity = Partial<Activity> & { open: boolean }

export default function ActivityProject({ id }: Props) {
  const [data, setData] = useState([])
  // const { data } = useActivity({
  //   enabled: !!id,
  //   projectId: id,
  // })
  const [selectedActivity, setSelectedActivity] =
    useState<null | SelectedActivity>(null)

  const { mutate: remove } = useDeleteActivity()
  const { mutate: toggle } = useToggleLikeActivity()
  const { mutate: update } = useUpdateActivity()
  const { mutate: removeAttachment } = useRemovePhotoActivity()
  const { mutate: upload } = useUploadPhotosActivity()

  useEffect(() => {
    if (!id) return

    socket.emit(JOIN_BY_PROJECT, { id })

    socket.on(MESSAGES_BY_PROJECT, (data: any) => {
      setData(data)
    })

    return () => {
      socket.off(MESSAGES_BY_PROJECT)
    }
  }, [id])

  return (
    <>
      <div className='flex flex-col gap-6'>
        <MessageForm type='textarea' projectId={id} />
        {data?.map((item: any) => (
          <MessageItem2
            key={`message-` + item.id}
            nameKey='activity'
            {...item}
            onSelectActivity={setSelectedActivity}
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
                    console.log('newAttachments',newAttachments)
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
      <ActivityDetail
        open={selectedActivity?.open ?? false}
        setOpen={() => setSelectedActivity(null)}
        id={selectedActivity?.id}
        projectId={id}
      />
    </>
  )
}

import ActivityDetail from '../activity/activity-detail'
import {
  useActivity,
  useDeleteActivity,
  useRemovePhotoActivity,
  useToggleLikeActivity,
  useUpdateActivity,
  useUploadPhotosActivity,
} from '@/hooks/api/use-activity'
import MessageForm from '../activity/message-form'
import { Activity } from '@/utils/types/api'
import { useState } from 'react'
import MessageItem2 from '../activity/message-item-2'

type Props = {
  id?: number | null
}
type SelectedActivity = Partial<Activity> & { open: boolean }
export default function ActivityProject({ id }: Props) {
  const { data } = useActivity({
    enabled: !!id,
    projectId: id,
  })
  const [selectedActivity, setSelectedActivity] =
    useState<null | SelectedActivity>(null)

  const { mutate: remove } = useDeleteActivity()
  const { mutate: toggle } = useToggleLikeActivity()
  const { mutate: update } = useUpdateActivity()
  const { mutate: removeAttachment } = useRemovePhotoActivity()
  const { mutate: upload } = useUploadPhotosActivity()

  return (
    <>
      <div className='flex flex-col gap-6'>
        <MessageForm type='textarea' projectId={id} />
        {data?.data.data?.map((item) => (
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

import ActivityDetail from '../activity/activity-detail'
import {
  useDeleteActivity,
  // useRemovePhotoActivity,
  useToggleLikeActivity,
  useUpdateActivity,
  // useUploadPhotosActivity,
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

export default function ActivityProject({ id: projectId }: Props) {
  const [data, setData] = useState([])

  const [selectedActivity, setSelectedActivity] =
    useState<null | SelectedActivity>(null)

  const { mutate: remove } = useDeleteActivity()
  const { mutate: toggle } = useToggleLikeActivity()
  const { mutate: update } = useUpdateActivity()

  useEffect(() => {
    if (!projectId) return

    socket.emit(JOIN_BY_PROJECT, { id: projectId })

    socket.on(MESSAGES_BY_PROJECT, (data: any) => {
      setData(data)
    })

    return () => {
      socket.off(MESSAGES_BY_PROJECT)
    }
  }, [projectId])

  return (
    <>
      <div className='flex flex-col gap-6'>
        <MessageForm type='textarea' projectId={projectId} />
        {data?.map((item: any) => (
          <MessageItem2
            key={`message-` + item.id}
            nameKey='activity'
            {...item}
            onSelectActivity={setSelectedActivity}
            onDelete={(id) => {
              remove({ id })
            }}
            onToggle={(userId, id) => {
              projectId && toggle({ id, userId, projectId, type: 'project' })
            }}
            onUpdate={({ id, comment, photos, deletedAttachments, reset }) => {
              if (!id) return
              update(
                {
                  id,
                  payload: {
                    comment: comment,
                    photos: photos,
                    deletedPhoto: deletedAttachments,
                    type: 'project',
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
      <ActivityDetail
        open={selectedActivity?.open ?? false}
        setOpen={() => setSelectedActivity(null)}
        id={selectedActivity?.id}
        projectId={projectId}
      />
    </>
  )
}

import ActivityDetail from '../activity/activity-detail'
import { useActivity, useDeleteActivity, useToggleLikeActivity } from '@/hooks/api/use-activity'
import MessageForm from '../activity/message-form'
import MessageItem from '../activity/message-item'
import { Activity } from '@/utils/types/api'
import { useState } from 'react'

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

  return (
    <>
      <div className='flex flex-col gap-6'>
        <MessageForm type='textarea' projectId={id} />
        {data?.data.data?.map((item) => (
          <MessageItem
            key={`message-` + item.id}
            {...item}
            onSelectActivity={setSelectedActivity}
            onDelete={(id) => {
              remove({ id })
            }}
            onToggle={(userId, activityId) => {
              toggle({ activityId, userId })
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

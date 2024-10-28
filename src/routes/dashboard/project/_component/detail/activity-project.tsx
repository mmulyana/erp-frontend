import ActivityDetail from '../activity/activity-detail'
import { useActivity } from '@/hooks/api/use-activity'
import MessageForm from '../activity/message-form'
import MessageItem from '../activity/message-item'
import { Activity } from '@/utils/types/api'
import { useState } from 'react'

type Props = {
  id?: number | null
}
export default function ActivityProject({ id }: Props) {
  const { data } = useActivity({
    enabled: !!id,
    projectId: id,
  })
  const [selectedActivity, setSelectedActivity] = useState<
    null | (Activity & { open: boolean })
  >(null)

  return (
    <>
      <div className='flex flex-col gap-6'>
        <MessageForm type='textarea' projectId={id} />
        {data?.data.data?.map((item) => (
          <MessageItem
            key={`message-` + item.id}
            {...item}
            onSelectActivity={setSelectedActivity}
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

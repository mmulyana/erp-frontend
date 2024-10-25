import Label from '@/components/common/label'
import { cn } from '@/utils/cn'
import { Project } from '@/utils/types/api'

type Props = {
  id: number
  data: Pick<Project, 'labels'>
}
export default function LabelProject({ id, data: { labels } }: Props) {
  return (
    <div className={cn('flex flex-wrap gap-2', labels.length > 2 && 'pt-2')}>
      {labels?.map((item) => (
        <Label color={item.label.color} name={item.label.name} />
      ))}
    </div>
  )
}

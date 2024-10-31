import { cn } from '@/utils/cn'
import {
  MessageCircle,
  Paperclip,
  UserRoundIcon,
  Users2Icon,
} from 'lucide-react'
import CircularProgress from '../common/circular-progress'
import { Project } from '@/utils/types/api'

export default function CardProject(props: Project) {
  return (
    <div
      className={cn(
        'w-full h-fit rounded-[10px] border border-[#E6EAF1] bg-white p-3.5 mb-2'
      )}
    >
      {props.client && (
        <div className='inline-flex gap-2 rounded-full pr-2 items-center'>
          <UserRoundIcon className='w-4 h-4 text-[#CBCDD3]' />
          <p className='text-sm text-dark/70'>{props?.client?.name}</p>
        </div>
      )}
      <p className={cn('text-dark font-medium', props.client && 'mt-4')}>
        {props.name}
      </p>
      <div
        className={cn(
          'flex gap-2 flex-wrap',
          !!props?.labels?.length && 'mt-2'
        )}
      >
        {!!props?.labels?.length &&
          props.labels.map((item: any, index: number) => (
            <div
              className='py-1 px-2.5 rounded-md border border-dark/20'
              key={index}
            >
              <p className='text-xs text-dark/70'>{item.label.name}</p>
            </div>
          ))}
      </div>

      <div className='flex justify-between items-center mt-4'>
        <div className='flex gap-2 items-center'>
          {props._count.employees && (
            <div className='flex gap-1 items-center'>
              <Users2Icon className='w-4 h-4 text-[#CBCDD3]' />
              <p className='text-sm text-dark'>{props?._count.employees}</p>
            </div>
          )}
          {props._count.activities && (
            <div className='flex gap-1 items-center'>
              <MessageCircle className='w-4 h-4 text-[#CBCDD3]' />
              <p className='text-sm text-dark'>{props?._count.activities}</p>
            </div>
          )}
          {props._count.attachments && (
            <div className='flex gap-1 items-center'>
              <Paperclip className='w-4 h-4 text-[#CBCDD3]' />
              <p className='text-sm text-dark'>{props._count.attachments}</p>
            </div>
          )}
        </div>
        <CircularProgress progress={props.progress || 0} />
      </div>
    </div>
  )
}

import { cn } from '@/utils/cn'
import {
  MessageCircle,
  Paperclip,
  UserRoundIcon,
  Users2Icon,
} from 'lucide-react'
import CircularProgress from '../common/circular-progress'

export default function CardProject(props: any) {
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
          {!!props?.employees.length && (
            <div className='flex gap-1 items-center'>
              <Users2Icon className='w-4 h-4 text-[#CBCDD3]' />
              <p className='text-sm text-dark'>{props?._count.employees}</p>
            </div>
          )}
          {!!props?.comments.length && (
            <div className='flex gap-1 items-center'>
              <MessageCircle className='w-4 h-4 text-[#CBCDD3]' />
              <p className='text-sm text-dark'>{props?._count.comments}</p>
            </div>
          )}
          <div className='flex gap-1 items-center'>
            <Paperclip className='w-4 h-4 text-[#CBCDD3]' />
            <p className='text-sm text-dark'>4</p>
          </div>
        </div>
        <CircularProgress progress={40} />
      </div>
    </div>
  )
}

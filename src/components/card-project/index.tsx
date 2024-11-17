import CircularProgress from '../common/circular-progress'

import { Project } from '@/utils/types/api'
import { cn } from '@/utils/cn'

import { Button } from '../ui/button'
import Chips from '../common/chips'
import Label from '../common/label'

import {
  ChevronRight,
  MessageCircle,
  Paperclip,
  User,
  UserRoundIcon,
  Users2Icon,
} from 'lucide-react'
import { useSetAtom } from 'jotai'
import { projectAtom } from '@/atom/project'

export default function CardProject({
  type = 'default',
  ...props
}: Partial<Project> & {
  type?: 'default' | 'long'
  isDragging?: boolean
  className?: string
}) {
  const setSelectedProject = useSetAtom(projectAtom)

  if (type === 'long') {
    return (
      <div className='flex justify-between items-center px-5 py-4 rounded-2xl bg-white flex-row gap-4 relative'>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 md:gap-4 items-start md:items-center flex-wrap flex-col md:flex-row'>
            <Chips
              background={props?.boardItems?.container.color}
              text={props?.boardItems?.container.name}
            />
            <p className='text-dark font-medium'>{props.name}</p>
            <div className={cn('flex gap-2')}>
              {!!props?.labels?.length &&
                props.labels.map((item, index) => (
                  <Label
                    key={`label-${props.id}-${index}`}
                    color={item.label.color}
                    name={item.label.name}
                    className='text-[13px]'
                  />
                ))}
            </div>
          </div>
          <div className='flex gap-4 items-center'>
            {props.client && (
              <>
                <div className='flex gap-3 items-center'>
                  <User size={18} className='text-gray-400' />
                  <p className='text-dark/50 leading-tight'>
                    {props.client?.name}
                  </p>
                </div>
                <div className='w-1 h-1 rounded-full bg-dark/40'></div>
              </>
            )}
            {(!!props._count?.activities ||
              !!props._count?.employees ||
              !!props._count?.attachments) && (
              <>
                <div className='flex gap-3 items-center'>
                  <div className='flex gap-2 items-center'>
                    {!!props?._count?.employees && (
                      <div className='flex gap-1 items-center'>
                        <Users2Icon className='w-4 h-4 text-[#CBCDD3]' />
                        <p className='text-sm text-dark'>
                          {props?._count.employees}
                        </p>
                      </div>
                    )}
                    {!!props?._count?.activities && (
                      <div className='flex gap-1 items-center'>
                        <MessageCircle className='w-4 h-4 text-[#CBCDD3]' />
                        <p className='text-sm text-dark'>
                          {props?._count.activities}
                        </p>
                      </div>
                    )}
                    {!!props?._count?.attachments && (
                      <div className='flex gap-1 items-center'>
                        <Paperclip className='w-4 h-4 text-[#CBCDD3]' />
                        <p className='text-sm text-dark'>
                          {props._count.attachments}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className='w-1 h-1 rounded-full bg-dark/40'></div>
              </>
            )}

            <CircularProgress progress={props.progress || 0} />
          </div>
        </div>

        <Button
          variant='outline'
          className='py-1 h-fit px-2 rounded-full md:rounded-md text-dark/50 gap-1 pr-1.5 ml-auto md:ml-0 absolute md:relative top-4 md:top-0 right-4 md:right-0 shadow-md shadow-gray-200'
          onClick={() =>
            props.id && setSelectedProject({ id: props.id, open: true })
          }
        >
          Lihat
          <ChevronRight
            size={16}
            className='text-dark/60'
            strokeWidth={2.5}
          />
        </Button>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'w-full h-fit rounded-[10px] border border-[#E6EAF1] bg-white p-3.5 mb-2',
        !!props.isDragging && 'border-blue-primary',
        props.className
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
          props.labels.map((item, index) => (
            <Label
              key={index}
              color={item.label.color}
              name={item.label.name}
            />
          ))}
      </div>

      <div className='flex justify-between items-center mt-4'>
        <div className='flex gap-2 items-center'>
          {!!props?._count?.employees && (
            <div className='flex gap-1 items-center'>
              <Users2Icon className='w-4 h-4 text-[#CBCDD3]' />
              <p className='text-sm text-dark'>{props?._count.employees}</p>
            </div>
          )}
          {!!props?._count?.activities && (
            <div className='flex gap-1 items-center'>
              <MessageCircle className='w-4 h-4 text-[#CBCDD3]' />
              <p className='text-sm text-dark'>{props?._count.activities}</p>
            </div>
          )}
          {!!props?._count?.attachments && (
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

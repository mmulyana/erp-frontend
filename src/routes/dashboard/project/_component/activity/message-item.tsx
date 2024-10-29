import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import DropdownEdit from '@/components/common/dropdown-edit'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Activity } from '@/utils/types/api'
import MessageForm from './message-form'
import { userAtom } from '@/atom/auth'
import { useAtomValue } from 'jotai'
import { format } from 'date-fns'
import { cn } from '@/utils/cn'

type MessageContentProps = Activity & {
  isOwnMessage: boolean
  onSelectActivity?: (val: Activity & { open: boolean }) => void
  onDelete?: (val: number) => void
}

function MessageContent({
  onSelectActivity,
  isOwnMessage,
  onDelete,
  ...props
}: MessageContentProps) {
  return (
    <div className='flex flex-col gap-0.5'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-1'>
          <p className={isOwnMessage ? 'text-dark/80' : 'text-dark/50 text-sm'}>
            {props?.user?.name}
          </p>
          <p className='text-sm text-dark/50'>
            {format(
              new Date(props.updated_at ?? props.created_at),
              'dd MMM yyyy, HH:mm'
            )}
          </p>
        </div>
        {isOwnMessage && (
          <DropdownEdit>
            <DropdownMenuItem className='text-sm'>Edit</DropdownMenuItem>
            <DropdownMenuItem
              className='text-sm'
              onClick={() => onDelete?.(props.id)}
            >
              Hapus
            </DropdownMenuItem>
          </DropdownEdit>
        )}
      </div>

      <p
        className={`text-dark ${isOwnMessage ? 'mt-1' : 'text-lg'}`}
        onClick={() => {
          onSelectActivity?.({ ...props, open: true })
        }}
      >
        {props.comment}
      </p>

      <div className='flex gap-1.5 items-center mt-1'>
        <div className='w-14 h-14 rounded-lg bg-gray-200'></div>
        <div className='w-14 h-14 rounded-lg bg-gray-200'></div>
        <div className='w-14 h-14 rounded-lg bg-gray-100 flex justify-center items-center'>
          <p className='text-dark font-medium'>2+</p>
        </div>
      </div>

      <div className='flex justify-between items-start gap-2 mt-1.5'>
        <div className='flex gap-2 items-center'>
          <Button
            className='px-2 gap-1.5 border-dark/10 rounded h-fit py-1 bg-transparent text-dark'
            variant='outline'
          >
            <ThumbsUp size={15} strokeWidth={2} />
            {!!props.likes?.length && (
              <p className='text-dark leading-none'>{props.likes.length}</p>
            )}
          </Button>
          <Button
            className='px-2 gap-1.5 border-dark/10 rounded h-fit py-1 bg-transparent text-dark'
            variant='outline'
            onClick={() => {
              onSelectActivity?.({ ...props, open: true })
            }}
          >
            <MessageCircle size={15} strokeWidth={2} />
            {!!props.replies?.length && (
              <p className='text-dark leading-none'>{props.replies.length}</p>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

type MessageItemProps = Activity & {
  onSelectActivity?: (val: Activity & { open: boolean }) => void
  onDelete?: (val: number) => void
  withReplies?: boolean
}

export default function MessageItem({
  onSelectActivity,
  withReplies = false,
  onDelete,
  ...props
}: MessageItemProps) {
  const currentUser = useAtomValue(userAtom)
  const isOwnMessage = currentUser?.id === props.user?.id

  return (
    <div>
      <div
        className={cn(
          withReplies && 'p-2.5',
          isOwnMessage
            ? 'grid grid-cols-[28px_1fr] gap-2 '
            : 'grid grid-cols-[28px_1fr] gap-2 border-b border-dark/10'
        )}
      >
        <div className='w-7 h-7 rounded-full bg-gray-200'></div>
        <MessageContent
          {...props}
          isOwnMessage={isOwnMessage}
          onSelectActivity={onSelectActivity}
          onDelete={onDelete}
        />
      </div>

      {withReplies && (
        <ScrollArea className='h-56 px-4 bg-[#F5F5F5] relative'>
          <div className='absolute top-0 left-0 w-full px-4 pt-2'>
            <MessageForm
              type='input'
              id={props.id}
              projectId={props.projectId}
            />
          </div>
          <div className='w-full flex flex-col gap-4 pt-16 pb-10'>
            {props.replies?.map((reply) => (
              <MessageItem
                onSelectActivity={onSelectActivity}
                key={`reply-${reply.id}`}
                withReplies={false}
                onDelete={onDelete}
                {...reply}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}

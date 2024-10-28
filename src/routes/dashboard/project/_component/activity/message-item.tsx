import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Activity } from '@/utils/types/api'
import { format } from 'date-fns'
import { ThumbsUp } from 'lucide-react'
import MessageForm from './message-form'
import DropdownEdit from '@/components/common/dropdown-edit'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export default function MessageItem({
  onSelectActivity,
  withReplies = false,
  ...props
}: Activity & {
  onSelectActivity?: (val: Activity & { open: boolean }) => void
  withReplies?: boolean
}) {
  return (
    <div>
      <div className='grid grid-cols-[28px_1fr] gap-2 p-2.5 border-b border-dark/10'>
        <div className='w-7 h-7 rounded-full bg-gray-200'></div>
        <div className='flex flex-col gap-0.5 pt-1'>
          <p className='text-dark/50 text-sm'>{props?.user?.name}</p>
          <p className='text-dark text-lg'>{props?.comment}</p>
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
                className='px-2 gap-1.5 border-dark/10 rounded-full h-fit py-1'
                variant='outline'
              >
                <ThumbsUp size={15} strokeWidth={2} className='text-gray-400' />

                {!!props.likes.length && (
                  <p className='text-dark leading-none'>{props.likes.length}</p>
                )}
              </Button>
            </div>

            <p className='text-sm text-dark/50'>
              {format(
                new Date(props.updated_at ?? props.created_at),
                'dd MMM yyyy, HH:mm'
              )}
            </p>
          </div>
        </div>
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
            {props.replies?.map((item) => (
              <div
                className='grid grid-cols-[28px_1fr] gap-2 px-2.5'
                key={`reply-${item.id}`}
              >
                <div className='w-7 h-7 rounded-full bg-gray-200'></div>
                <div className='flex flex-col gap-0.5'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-1'>
                      <p className='text-dark/80'>{item?.user?.name}</p>
                      <p className='text-sm text-dark/50'>
                        {format(
                          new Date(item.updated_at ?? item.created_at),
                          'dd MMM yyyy, HH:mm'
                        )}
                      </p>
                    </div>
                    <DropdownEdit>
                      <DropdownMenuItem className='text-sm'>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className='text-sm'>
                        Hapus
                      </DropdownMenuItem>
                    </DropdownEdit>
                  </div>
                  <p className='text-dark mt-1'>{item?.comment}</p>
                  <div className='flex justify-between items-start gap-2 mt-1.5'>
                    <div className='flex gap-2 items-center'>
                      <Button
                        className='px-2 gap-1.5 border-dark/10 rounded-full h-fit py-1'
                        variant='outline'
                      >
                        <ThumbsUp
                          size={15}
                          strokeWidth={2}
                          className='text-gray-400'
                        />

                        {/* {!!item.likes.length && (
                        <p className='text-dark leading-none'>
                          {item.likes.length}
                        </p>
                      )} */}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}

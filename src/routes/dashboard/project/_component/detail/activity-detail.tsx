import { userAtom } from '@/atom/auth'
import DropdownEdit from '@/components/common/dropdown-edit'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { useCreateActivity, useDetailActivity } from '@/hooks/api/use-activity'
import { Activity } from '@/utils/types/api'
import { format } from 'date-fns'
import { useAtomValue } from 'jotai'
import { Camera, SendHorizonal, ThumbsUp, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  projectId?: number | null
  id?: number | null
}
export default function ActivityDetail({
  open,
  setOpen,
  projectId,
  id,
}: Props) {
  const { data, isLoading } = useDetailActivity({
    enabled: !!id && !!projectId,
    projectId,
    id,
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className='p-0 overflow-hidden'
        showClose={false}
        close={<CustomClose setOpen={setOpen} />}
      >
        <DialogHeader className='py-1 px-4 border'>
          <DialogTitle className='text-base font-normal'>Detail</DialogTitle>
        </DialogHeader>
        {data && data.data.data && <MessageItem {...data?.data.data} />}
      </DialogContent>
    </Dialog>
  )
}

type CloseProps = {
  setOpen: (val: boolean) => void
}
function CustomClose({ setOpen }: CloseProps) {
  return (
    <div className='absolute top-0 right-2 h-8 flex items-center'>
      <button
        className='h-7 w-7 flex justify-center items-center rounded'
        onClick={() => setOpen(false)}
      >
        <X className='h-4 w-4' />
        <span className='sr-only'>Close</span>
      </button>
    </div>
  )
}

function MessageItem(props: Activity) {
  return (
    <div>
      <div className='grid grid-cols-[28px_1fr] gap-2 p-2.5 border-b border-dark/10'>
        <div className='w-7 h-7 rounded-full bg-gray-200'></div>
        <div className='flex flex-col gap-0.5 pt-1'>
          <p className='text-dark/50 text-sm'>{props?.user?.name}</p>
          <p className='text-dark text-lg'>{props?.comment}</p>
          {/* <div className='flex gap-1.5 items-center mt-1'>
          <div className='w-14 h-14 rounded-lg bg-gray-200'></div>
          <div className='w-14 h-14 rounded-lg bg-gray-200'></div>
          <div className='w-14 h-14 rounded-lg bg-gray-100 flex justify-center items-center'>
            <p className='text-dark font-medium'>2+</p>
          </div>
        </div> */}
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
      <ScrollArea className='h-56 px-4 bg-[#F5F5F5] relative'>
        <div className='absolute top-0 left-0 w-full px-4 pt-2'>
          <MessageForm type='input' id={props.id} projectId={props.projectId} />
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
    </div>
  )
}

type MessageProps = {
  type: 'textarea' | 'input'
  id: number
  projectId: number
}
function MessageForm({ type, id, projectId }: MessageProps) {
  const user = useAtomValue(userAtom)

  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const elementWidth = ref.current.clientWidth
      setWidth(elementWidth)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.clientWidth)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // HANDLE FORM
  const { mutate } = useCreateActivity()
  const form = useForm<{ comment: string }>({
    defaultValues: {
      comment: '',
    },
  })

  const submit = async (data: any) => {
    if (!id || !user) return

    mutate(
      {
        projectId,
        comment: data.comment,
        userId: user?.id,
        replyId: id ?? null,
      },
      {
        onSuccess: () => {
          console.log('berhasil')
          form.reset({ comment: '' })
        },
      }
    )
  }

  if (type == 'textarea') {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <div className='w-full relative' ref={ref}>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='comment'
                render={({ field }) => (
                  <Textarea
                    className='rounded-xl textarea'
                    style={{ maxWidth: width + 'px' }}
                    {...field}
                  />
                )}
              />
            </div>
            <div className='flex justify-between items-center gap-2 mt-2'>
              <div className='flex items-center gap-2'>
                <div className='flex gap-1.5'>
                  <div className='w-8 h-8 rounded-md bg-gray-200'></div>
                </div>
                <button
                  type='button'
                  className='hover:bg-gray-100 px-2 rounded-md text-gray-400 h-8'
                >
                  <Camera size={20} />
                </button>
              </div>
              <Button
                type='submit'
                className='p-0 w-fit px-2 pl-3 gap-1 h-8 rounded-full'
              >
                Kirim
                <SendHorizonal size={16} />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className='w-full relative' ref={ref}>
          <div className='w-full'>
            <FormField
              control={form.control}
              name='comment'
              render={({ field }) => (
                <div className='relative'>
                  <Input
                    className='rounded-full'
                    placeholder='tulis pesan disini'
                    {...field}
                  />
                  <div className='flex justify-between items-center gap-2 absolute top-1/2 -translate-y-1/2 right-1'>
                    <button
                      type='button'
                      className='hover:bg-gray-100 px-2 rounded-md text-gray-400 h-8'
                    >
                      <Camera size={20} />
                    </button>
                    <Button
                      type='submit'
                      className='p-0 w-fit px-2 gap-1 h-8 rounded-full'
                    >
                      <SendHorizonal size={16} />
                    </Button>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}

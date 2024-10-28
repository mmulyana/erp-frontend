import { userAtom } from '@/atom/auth'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useActivity, useCreateActivity } from '@/hooks/api/use-activity'
import { Activity } from '@/utils/types/api'
import { format } from 'date-fns'
import { useAtomValue } from 'jotai'
import { Camera, MessageCircle, SendHorizonal, ThumbsUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  id?: number | null
}
export default function ActivityProject({ id }: Props) {
  const { data } = useActivity({
    enabled: !!id,
    id: Number(id),
  })
  console.log(data)
  return (
    <div className='flex flex-col gap-6'>
      <MessageForm type='textarea' id={id} />
      {data?.data.data?.map((item) => (
        <MessageItem key={`message-` + item.id} {...item} />
      ))}
    </div>
  )
}

type MessageProps = Props & {
  type: 'textarea' | 'input'
}
function MessageForm({ type, id }: MessageProps) {
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
  const form = useForm<{ comment: string }>()

  const submit = async (data: any) => {
    if (!id || !user) return

    mutate({ projectId: id, comment: data.comment, userId: user?.id })
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

  return null
}

function MessageItem(props: Activity) {
  return (
    <div className='grid grid-cols-[28px_1fr] gap-2'>
      <div className='w-7 h-7 rounded-full bg-gray-200'></div>
      <div className='flex flex-col gap-0.5 pt-1'>
        <p className='text-dark/50 text-sm'>{props.user.name}</p>
        <p className='text-dark'>{props.comment}</p>
        <div className='flex gap-1.5 items-center mt-1'>
          <div className='w-14 h-14 rounded-lg bg-gray-200'></div>
          <div className='w-14 h-14 rounded-lg bg-gray-200'></div>
          <div className='w-14 h-14 rounded-lg bg-gray-100 flex justify-center items-center'>
            <p className='text-dark font-medium'>2+</p>
          </div>
        </div>
        <div className='flex justify-between items-start md:items-center mt-2 flex-col md:flex-row gap-2'>
          <div className='flex gap-2 items-center'>
            <Button
              className='px-2 gap-1.5 border-dark/10 rounded-full h-fit py-1'
              variant='outline'
            >
              <ThumbsUp size={15} strokeWidth={2} className='text-gray-400' />
              <p className='text-dark leading-none'>12</p>
            </Button>
            <Button
              className='px-2 gap-1.5 border-dark/10 rounded-full h-fit py-1'
              variant='outline'
            >
              <MessageCircle
                size={15}
                strokeWidth={2}
                className='text-gray-400'
              />
              <p className='text-dark leading-none'>2</p>
            </Button>
          </div>

          <p className='text-sm text-dark/50'>
            {format(new Date(), 'dd MMM yyyy HH:mm')}
          </p>
        </div>
      </div>
    </div>
  )
}

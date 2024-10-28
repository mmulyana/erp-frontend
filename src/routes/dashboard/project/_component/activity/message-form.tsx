import { userAtom } from '@/atom/auth'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateActivity } from '@/hooks/api/use-activity'
import { useAtomValue } from 'jotai'
import { Camera, SendHorizonal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

type MessageProps = {
  type: 'textarea' | 'input'
  id?: number | null
  projectId?: number | null
}
export default function MessageForm({ type, id, projectId }: MessageProps) {
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
    if (!user || !projectId) return

    mutate(
      {
        projectId,
        comment: data.comment,
        userId: user?.id,
        replyId: id ?? null,
      },
      {
        onSuccess: () => {
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

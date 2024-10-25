import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { format } from 'date-fns'
import { Camera, MessageCircle, SendHorizonal, ThumbsUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function ActivityProject() {
  return (
    <div className='flex flex-col gap-6'>
      <MessageForm type='textarea' />
      <MessageItem />
      <MessageItem />
      <MessageItem />
    </div>
  )
}

type MessageProps = {
  type: 'textarea' | 'input'
}
function MessageForm({ type }: MessageProps) {
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

  if (type == 'textarea') {
    return (
      <div className='w-full relative' ref={ref}>
        <div className='w-full'>
          <Textarea
            className='rounded-xl textarea'
            style={{ maxWidth: width + 'px' }}
          />
        </div>
        <div className='flex justify-between items-center gap-2 mt-2'>
          <div className='flex items-center gap-2'>
            <div className='flex gap-1.5'>
              <div className='w-8 h-8 rounded-md bg-gray-200'></div>
            </div>
            <button className='hover:bg-gray-100 px-2 rounded-md text-gray-400 h-8'>
              <Camera size={20} />
            </button>
          </div>
          <Button className='p-0 w-fit px-2 pl-3 gap-1 h-8 rounded-full'>
            Kirim
            <SendHorizonal size={16} />
          </Button>
        </div>
      </div>
    )
  }

  return null
}

function MessageItem() {
  return (
    <div className='grid grid-cols-[28px_1fr] gap-2'>
      <div className='w-7 h-7 rounded-full bg-gray-200'></div>
      <div className='flex flex-col gap-0.5 pt-1'>
        <p className='text-dark/50 text-sm'>Muhamad Mulyana</p>
        <p className='text-dark'>Progress pekerjaan di line 5</p>
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

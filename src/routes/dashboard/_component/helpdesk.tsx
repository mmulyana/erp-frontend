import { Bug, Headset, MessageSquarePlus } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/utils/cn'

export default function Helpdesk() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='fixed bottom-6 right-6'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-14 h-14 rounded-full bg-brand-blue text-white shadow-lg transition-transform duration-300 ease-in-out flex justify-center items-center shadow-brand-blue/50'
        )}
      >
        <Headset />
      </button>

      {isOpen && (
        <div className='absolute bottom-20 right-0 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-2 bg-white shadow-lg shadow-gray-200 rounded-md  h-fit w-full md:w-[280px] overflow-hidden pb-1.5'>
          <div className='h-10 w-full bg-brand-blue flex items-center px-4 text-white gap-1.5 '>
            <Headset size={18} />
            <span className=''>Helpdesk</span>
          </div>
          <button className='w-full hover:bg-accent flex items-center gap-2 py-6 border-b px-4'>
            <MessageSquarePlus className='text-gray-400' />
            <p className='text-dark font-medium'>Buat Fitur Baru</p>
          </button>
          <button className='w-full hover:bg-accent flex items-center gap-2 py-6 px-4 border-b'>
            <Bug className='text-gray-400' />
            <p className='text-dark font-medium'>Lapor Kendala/Kesalahan</p>
          </button>
        </div>
      )}
    </div>
  )
}

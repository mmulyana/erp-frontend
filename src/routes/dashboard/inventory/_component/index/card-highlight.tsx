import { Package } from 'lucide-react'
import ButtonLink from '../button-link'

export default function CardHighlight() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 rounded-[8px] border border-line h-fit'>
      <div className='py-4 px-6 w-full h-full'>
        <div className='h-8 w-8 rounded-full bg-green-primary/10 flex justify-center items-center'>
          <Package className='w-5 h-5 text-green-primary' />
        </div>
        <div className='mt-2.5 flex flex-col gap-3.5'>
          <p className='text-sm text-dark/50'>Stok dipinjam</p>
          <div className='w-full flex justify-between items-center'>
            <p className='text-lg font-medium text-dark'>20</p>
            <ButtonLink />
          </div>
        </div>
      </div>

      <div className='py-4 px-6 w-full h-full border-l border-line'>
        <div className='h-8 w-8 rounded-full bg-[#E09F54]/10 flex justify-center items-center'>
          <Package className='w-5 h-5 text-[#E09F54]' />
        </div>
        <div className='mt-2.5 flex flex-col gap-3.5'>
          <p className='text-sm text-dark/50'>Stok Hampir Habis</p>
          <div className='w-full flex justify-between items-center'>
            <p className='text-lg font-medium text-dark'>20</p>
            <ButtonLink />
          </div>
        </div>
      </div>
      <div className='py-4 px-6 w-full h-full border-l border-line'>
        <div className='h-8 w-8 rounded-full bg-[#CE3E3E]/10 flex justify-center items-center'>
          <Package className='w-5 h-5 text-[#CE3E3E]' />
        </div>
        <div className='mt-2.5 flex flex-col gap-3.5'>
          <p className='text-sm text-dark/50'>Stok Habis</p>
          <div className='w-full flex justify-between items-center'>
            <p className='text-lg font-medium text-dark'>20</p>
            <ButtonLink />
          </div>
        </div>
      </div>
    </div>
  )
}

import {
  AccordionContent,
  AccordionGroup,
  AccordionItem,
  AccordionTrigger,
} from '@/components/common/accordion'
import { Input } from '@/components/ui/input'
import { cn } from '@/utils/cn'
import { formatToRupiah } from '@/utils/formatCurrency'
import { Triangle, X } from 'lucide-react'

export default function EstimateProject() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='rounded-lg bg-white py-2 w-full border border-line'>
        <div className='flex justify-between items-center px-4'>
          <p className='text-dark/60 text-sm'>Manpower</p>
        </div>
        <div className='grid grid-cols-[2fr_40px_2fr] pr-4 mt-2'>
          <div className='grid grid-cols-[32px_1fr] items-center gap-2'>
            <p className='text-dark/50 text-sm col-start-2'>Nama</p>
          </div>
          <div className='text-center'>
            <p className='text-dark/50 text-sm'>Hari</p>
          </div>
          <div className='text-right'>
            <p className='text-dark/50 text-sm'>total</p>
          </div>
        </div>
        <AccordionGroup>
          <AccordionItem id='item-1'>
            <AccordionTrigger>
              {(isOpen) => (
                <div className='grid grid-cols-[2fr_40px_2fr] pr-4 py-1.5 border-b'>
                  <div className='grid grid-cols-[32px_1fr] items-center gap-2'>
                    <button className='flex justify-center' onClick={() => {}}>
                      <Triangle
                        size={12}
                        className={cn('fill-dark/80', !isOpen && 'rotate-180')}
                        strokeWidth={0}
                      />
                    </button>
                    <p className='text-dark text-sm'>Mulyana</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-dark text-sm'>2</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-dark text-sm'>
                      {formatToRupiah(12000000)}
                    </p>
                  </div>
                </div>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <p>isinya</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id='item-2'>
            <AccordionTrigger>
              {(isOpen) => (
                <div className='grid grid-cols-[2fr_40px_2fr] pr-4 py-1.5 border-b'>
                  <div className='grid grid-cols-[32px_1fr] items-center gap-2'>
                    <button className='flex justify-center' onClick={() => {}}>
                      <Triangle
                        size={12}
                        className={cn('fill-dark/80', !isOpen && 'rotate-180')}
                        strokeWidth={0}
                      />
                    </button>
                    <p className='text-dark text-sm'>Mulyana</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-dark text-sm'>2</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-dark text-sm'>
                      {formatToRupiah(12000000)}
                    </p>
                  </div>
                </div>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <p>isinya</p>
            </AccordionContent>
          </AccordionItem>
        </AccordionGroup>
        <div className='grid grid-cols-4 pr-4 pt-2 pb-1'>
          <div className='col-start-3'>
            <p className='text-sm text-dark/50'>Subtotal</p>
          </div>
          <div>
            <p className='text-sm text-dark'>{formatToRupiah(24000000)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

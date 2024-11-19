import { HardHat } from 'lucide-react'

import { useTotalProject } from '@/hooks/api/use-project'
import { useApiData } from '@/hooks/use-api-data'

export default function TotalProjectActive() {
  const { data } = useApiData(useTotalProject())

  return (
    <div className='border border-line rounded-2xl flex items-center gap-5 p-2'>
      <div className='h-14 w-14 rounded-[10px] bg-blue-primary/5 flex justify-center items-center'>
        <HardHat className='text-blue-primary' size={24} />
      </div>
      <div className='flex flex-col gap-1'>
        <p className='text-dark/50 leading-none text-sm'>Total Proyek</p>
        <p className='text-dark font-medium text-xl leading-none'>
          {data?.active}
        </p>
      </div>
    </div>
  )
}

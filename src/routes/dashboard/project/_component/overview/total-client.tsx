import { SquareUserRound } from 'lucide-react'

import { useClient } from '@/hooks/api/use-client'
import { useApiData } from '@/hooks/use-api-data'

export default function TotalClient() {
  const { data } = useApiData(useClient())

  return (
    <div className='border border-line rounded-2xl flex items-center gap-5 p-2'>
      <div className='h-14 w-14 rounded-[10px] bg-amber-50 flex justify-center items-center'>
        <SquareUserRound className='text-amber-600' size={24} />
      </div>
      <div className='flex flex-col gap-1'>
        <p className='text-dark/50 leading-none text-sm'>Total Klien</p>
        <p className='text-dark font-medium text-xl leading-none'>
          {data?.length}
        </p>
      </div>
    </div>
  )
}

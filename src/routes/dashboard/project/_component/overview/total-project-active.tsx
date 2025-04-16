import { HardHat } from 'lucide-react'

import { useTotalProject } from '@/hooks/api/use-project'
import { useApiData } from '@/shared/hooks/use-api-data'

import { TEST_ID } from '@/shared/constants/testId'

export default function TotalProjectActive() {
  const { data } = useApiData(useTotalProject())

  return (
    <div
      className='border border-line rounded-2xl flex items-center gap-5 p-2'
      id={TEST_ID.TOTAL_PROJECT_ACTIVE}
      data-testid={TEST_ID.TOTAL_PROJECT_ACTIVE}
    >
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

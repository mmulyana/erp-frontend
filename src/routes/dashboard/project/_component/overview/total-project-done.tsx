import { ListChecks } from 'lucide-react'

import { useTotalProject } from '@/hooks/api/use-project'
import { useApiData } from '@/shared/hooks/use-api-data'

import { TEST_ID } from '@/utils/constant/_testId'

export default function TotalProjectDone() {
  const { data } = useApiData(useTotalProject())

  return (
    <div
      className='border border-line rounded-2xl flex items-center gap-5 p-2'
      id={TEST_ID.TOTAL_PROJECT_DONE}
      data-testid={TEST_ID.TOTAL_PROJECT_DONE}
    >
      <div className='h-14 w-14 rounded-[10px] bg-green-primary/5 flex justify-center items-center'>
        <ListChecks className='text-green-primary' size={24} />
      </div>
      <div className='flex flex-col gap-1'>
        <p className='text-dark/50 leading-none text-sm'>
          Total Proyek Selesai
        </p>
        <p className='text-dark font-medium text-xl leading-none'>
          {data?.done}
        </p>
      </div>
    </div>
  )
}

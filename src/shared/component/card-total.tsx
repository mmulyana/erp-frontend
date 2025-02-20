import { HardHat, Users2 } from 'lucide-react'

import { TEST_ID } from '@/utils/constant/_testId'
import { useApiData } from '@/shared/hooks/use-api-data'

import { useDashboardTotal } from '../../features/home/hooks/use-dashboard'

export default function CardTotal() {
  const { data } = useApiData(useDashboardTotal())

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <div
        className='border border-line rounded-2xl flex items-center gap-5 p-2'
        id={TEST_ID.TOTAL_EMPLOYEE_OVERVIEW}
        data-testid={TEST_ID.TOTAL_EMPLOYEE_OVERVIEW}
      >
        <div className='h-14 w-14 rounded-[10px] bg-green-primary/5 flex justify-center items-center'>
          <Users2 className='text-green-primary' size={20} />
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-dark/50 leading-none text-sm'>Total Pegawai</p>
          <p className='text-dark font-medium text-xl leading-none'>
            {data?.total.employee}
          </p>
        </div>
      </div>
      <div
        className='border border-line rounded-2xl flex items-center gap-5 p-2'
        id={TEST_ID.TOTAL_PROJECT_OVERVIEW}
        data-testid={TEST_ID.TOTAL_PROJECT_OVERVIEW}
      >
        <div className='h-14 w-14 rounded-[10px] bg-blue-primary/5 flex justify-center items-center'>
          <HardHat className='text-blue-primary' size={20} />
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-dark/50 leading-none text-sm'>Total Proyek</p>
          <p className='text-dark font-medium text-xl leading-none'>
            {data?.total.project}
          </p>
        </div>
      </div>
    </div>
  )
}

import { ClipboardList } from 'lucide-react'

import { TEST_ID } from '@/utils/constant/_testId'

import CardProject from '@/components/card-project'
import { ScrollArea } from '@/components/ui/scroll-area'

import { useProjects } from '@/hooks/api/use-project'
import { useApiData } from '@/hooks/use-api-data'

export default function ListProject() {
  const { data } = useApiData(useProjects())

  return (
    <div
      className='col-span-full bg-dark/5 rounded-2xl p-4 h-fit'
      id={TEST_ID.PROJECT_LIST_OVERVIEW}
      data-testid={TEST_ID.PROJECT_LIST_OVERVIEW}
    >
      <div className='flex items-center gap-3 pb-4 border-b border-dark/20 border-dashed mb-4'>
        <div className='h-10 w-10 rounded-[10px] border border-dark/20 flex justify-center items-center bg-white'>
          <ClipboardList size={24} className='text-dark' />
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-dark leading-none'>Proyek</p>
          <p className='text-sm text-dark/50 leading-none'>
            Daftar proyek aktif
          </p>
        </div>
      </div>
      <ScrollArea className='h-[calc(100vh-275px)]'>
        <div className='flex flex-col gap-4 h-full'>
          {data?.map((item) => (
            <CardProject {...item} type='long' key={`project-${item.id}`} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

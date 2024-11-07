import { PATH } from '@/utils/constant/_paths'

import { DashboardLayout } from './_component/layout'
import { useTitle } from './_component/header'
import Container from './_component/container'

import { useApiData } from '@/hooks/use-api-data'
import { useProjects } from '@/hooks/api/use-project'

import { ClipboardList, HardHat, Users2 } from 'lucide-react'
import CardProject from '@/components/card-project'
import ExpireCertif from './hris/employee/_component/detail/expire-certif'
import ExpireSafety from './hris/employee/_component/detail/expire-safety'

import { useDashboardTotal } from './_hook/use-dashboard'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Dashboard() {
  useTitle([{ name: 'Dashboard', path: PATH.DASHBOARD_OVERVIEW }])

  const { data } = useApiData(useProjects())
  const { data: dashboard } = useApiData(useDashboardTotal())

  return (
    <DashboardLayout>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 gap-y-4'>
          <div className='col-span-1 md:col-span-2 space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='border border-line rounded-2xl flex items-center gap-5 p-2'>
                <div className='h-14 w-14 rounded-[10px] bg-green-primary/5 flex justify-center items-center'>
                  <Users2 className='text-green-primary' size={20} />
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-dark/50 leading-none text-sm'>
                    Total Pegawai
                  </p>
                  <p className='text-dark font-medium text-xl leading-none'>
                    {dashboard?.total.employee}
                  </p>
                </div>
              </div>
              <div className='border border-line rounded-2xl flex items-center gap-5 p-2'>
                <div className='h-14 w-14 rounded-[10px] bg-blue-primary/5 flex justify-center items-center'>
                  <HardHat className='text-blue-primary' size={20} />
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-dark/50 leading-none text-sm'>
                    Total Proyek
                  </p>
                  <p className='text-dark font-medium text-xl leading-none'>
                    {dashboard?.total.project}
                  </p>
                </div>
              </div>
            </div>
            <div className='col-span-full bg-dark/5 rounded-2xl p-4 h-fit'>
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
              <ScrollArea className='h-[calc(100vh-260px)]'>
                <div className='flex flex-col gap-4 h-full'>
                  {data?.map((item) => (
                    <CardProject {...item} type='long' />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <ExpireCertif />
            <ExpireSafety />
          </div>
        </div>
      </Container>
    </DashboardLayout>
  )
}

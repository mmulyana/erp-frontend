import { PATH } from '@/utils/constant/_paths'
import { useTitle } from './_component/header'
import { DashboardLayout } from './_component/layout'
import { Card, Cardbody, CardHead } from '@/components/common/card-v1'
import { BriefcaseBusiness, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Dashboard() {
  useTitle([{ name: 'Dashboard', path: PATH.DASHBOARD_OVERVIEW }])
  return (
    <DashboardLayout>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-4'>
        <div className='col-span-1 md:col-span-2'>
          <Card className='overflow-hidden'>
            <CardHead className='h-14'>
              <div className='flex gap-2 items-center'>
                <BriefcaseBusiness className='w-5 h-5 text-[#989CA8]' />
                <p className='ml-2 text-dark font-medium'>Proyek</p>
                <p className='text-dark text-base font-semibold'>
                  4<span className='opacity-50 font-normal'>/5</span>
                </p>
              </div>
              <div className='rounded-full h-7 flex gap-8 bg-[#EFF0F2] p-0.5'>
                <button className='h-6 w-6 rounded-full bg-white flex items-center justify-center'>
                  <ChevronLeft className='w-3.5 h-3.5 text-dark/70' />
                </button>
                <button className='h-6 w-6 rounded-full bg-white flex items-center justify-center'>
                  <ChevronRight className='w-3.5 h-3.5 text-dark/70' />
                </button>
              </div>
            </CardHead>
            <Cardbody className='p-4 bg-[#EFF0F2]' />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

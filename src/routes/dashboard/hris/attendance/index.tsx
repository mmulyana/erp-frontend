import { FilePenIcon } from 'lucide-react'
import { useAtomValue } from 'jotai'

import { permissionAtom } from '@/shared/store/permission'
import { PATH } from '@/utils/constant/_paths'

import ProtectedComponent from '@/components/protected'
import { Tab, Tabs } from '@/components/tab'

import DateNavigation from './_component/date-navigation'
import TitlePage from '../../_component/title-page'
import { DashboardLayout } from '../../_component/layout'
import { useTitle } from '../../_component/header'
import { Overtime } from './_component/overtime'
import { Regular } from './_component/regular'

const links = [
  {
    name: 'Dashboard',
    path: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Absensi',
    path: PATH.EMPLOYEE_ATTENDANCE,
  },
]

export default function Page() {
  useTitle(links)

  const permission = useAtomValue(permissionAtom)

  return (
    <DashboardLayout className='overflow-hidden'>
      <TitlePage className='mb-2 flex justify-between items-center'>
        <div className='flex gap-4 items-center'>
          <FilePenIcon className='text-[#989CA8]' />
          <p className='text-dark font-medium'>Absensi</p>
        </div>
        <DateNavigation />
      </TitlePage>
      <ProtectedComponent
        required={['attendance:read', 'overtime:read']}
        fallback={
          <p className='text-center text-dark/50'>
            Anda tidak diizinkan mengakses fitur ini
          </p>
        }
      >
        <Tabs>
          <Tab
            label='Reguler'
            hidden={!permission?.includes('attendance:read')}
          >
            <Regular />
          </Tab>
          <Tab label='Lembur' hidden={!permission?.includes('overtime:read')}>
            <Overtime />
          </Tab>
        </Tabs>
      </ProtectedComponent>
    </DashboardLayout>
  )
}

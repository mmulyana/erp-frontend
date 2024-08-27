import { generatePath, useParams } from 'react-router-dom'
import { EmployeeStatus } from '@/utils/enum/common'
import { PATH } from '@/utils/constant/_paths'
import { Tab, Tabs } from '@/components/tab'
import { TableEmployee } from './component'
import {
  Breadcrumb,
  Container,
  DashboardLayout,
  Header,
} from '@/routes/dashboard/component'
import { useState } from 'react'

const links = [
  {
    name: 'Dashboard',
    href: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Jabatan',
    href: PATH.EMPLOYEE,
  },
]

export default function Detail() {
  const { detail } = useParams()
  const [lastLink] = useState<any>(() => {
    if (!detail) return
    const parts = detail.split('-')
    parts.pop()
    const result = parts.join(' ')
    return {
      name: result,
      href: generatePath(PATH.EMPLOYEE_DETAIL, {
        detail: detail?.split('-').pop(),
      }),
    }
  })
  const positionId = detail?.split('-').pop()

  return (
    <DashboardLayout>
      <Header title='Pegawai' />
      <Container className='pt-4 pb-6'>
        <Breadcrumb links={[...links, lastLink]} />
      </Container>
      <Tabs>
        <Tab label='Semua' badge='120'>
          <Container className='py-6'>
            <TableEmployee positionId={positionId} />
          </Container>
        </Tab>
        <Tab label='Aktif' badge='50'>
          <Container className='py-6'>
            <TableEmployee
              status={EmployeeStatus.active}
              positionId={positionId}
            />
          </Container>
        </Tab>
        <Tab label='Tidak aktif' badge='50'>
          <Container className='py-6'>
            <TableEmployee
              status={EmployeeStatus.nonactive}
              positionId={positionId}
            />
          </Container>
        </Tab>
      </Tabs>
    </DashboardLayout>
  )
}

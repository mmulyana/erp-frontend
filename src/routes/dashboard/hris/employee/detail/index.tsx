import { generatePath, useParams } from 'react-router-dom'
import { EmployeeStatus } from '@/utils/enum/common'
import { PATH } from '@/utils/constant/_paths'
import { Tab, Tabs } from '@/components/tab'
import { TableEmployee } from './component'
import { DashboardLayout } from '@/routes/dashboard/component'
import { useState } from 'react'
import { Title, useTitle } from '@/routes/dashboard/_component/header'
import Container from '@/routes/dashboard/_component/container'

const links = [
  {
    name: 'Dashboard',
    path: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Jabatan',
    path: PATH.EMPLOYEE,
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
      path: generatePath(PATH.EMPLOYEE_DETAIL, {
        detail: detail?.split('-').pop(),
      }),
    }
  })
  useTitle([
    ...links,
    lastLink as Title,
  ])

  const positionId = detail?.split('-').pop()

  return (
    <DashboardLayout>
      <Tabs className='mt-5'>
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

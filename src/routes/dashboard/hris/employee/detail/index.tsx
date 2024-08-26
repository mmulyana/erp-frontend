import { Tab, Tabs } from '@/components/tab'
import { useEmployees } from '@/hooks/use-employee'
import {
  Breadcrumb,
  DashboardLayout,
  Header,
} from '@/routes/dashboard/component'
import { PATH } from '@/utils/constant/_paths'
import { useState } from 'react'
import { generatePath, useParams } from 'react-router-dom'
import { Container } from '../component'

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
  const {} = useEmployees({ positionId: detail?.split('-').pop() })

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

  return (
    <DashboardLayout>
      <Header title='Pegawai' />
      <Container>
        <Breadcrumb links={[...links, lastLink]} />
        <Tabs>
          <Tab label='Semua' badge='120'>
            <p>Semua</p>
            <p>{detail?.split('-').pop()}</p>
          </Tab>
          <Tab label='Aktif' badge='50'>
            <p>Aktif</p>
          </Tab>
        </Tabs>
      </Container>
    </DashboardLayout>
  )
}

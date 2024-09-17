import React, { useState } from 'react'
import { Tab, TabsV2 } from '@/components/tab'
import { LayoutDashboard, Table } from 'lucide-react'
import { Container, DashboardLayout } from '../../component'
import { Kanban } from './component'

export default function Mode() {
  const [active, setActive] = useState(0)

  const Views: Record<number, React.ReactNode> = {
    0: <Kanban />,
    1: <p>2</p>
  }

  return (
    <DashboardLayout>
      <div className='pt-2'>
        <TabsV2 active={active} setActive={setActive}>
          <Tab label='Kanban' index={0}>
            <div className='flex gap-2 items-center'>
              <LayoutDashboard className='w-4 h-4' />
              <p>Kanban</p>
            </div>
          </Tab>
          <Tab label='Kanban' index={1}>
            <div className='flex gap-2 items-center'>
              <Table className='w-4 h-4' />
              <p>Daftar</p>
            </div>
          </Tab>
        </TabsV2>
      </div>
      <Container className='h-[calc(100vh-109px)]'>{Views[active]}</Container>
    </DashboardLayout>
  )
}

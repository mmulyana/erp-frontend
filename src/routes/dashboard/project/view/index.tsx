import React, { useState } from 'react'
import { Tab, TabsV2 } from '@/components/tab'
import { LayoutDashboard, Table } from 'lucide-react'
import { DashboardLayout } from '../../component'
import { Mode } from './component'
import { cn } from '@/utils/cn'
import Container from '../../_component/container'

export default function View() {
  const [active, setActive] = useState(0)

  const Views: Record<number, React.ReactNode> = {
    0: <Mode view='kanban' />,
    1: <Mode view='list' />,
  }

  return (
    <DashboardLayout>
      <div className='pt-3'>
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
      <Container
        className={cn(
          active == 0 && 'h-[calc(100vh-109px)]',
          active != 0 && 'px-0'
        )}
      >
        {Views[active]}
      </Container>
    </DashboardLayout>
  )
}

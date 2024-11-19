import { BriefcaseBusinessIcon, Settings2Icon } from 'lucide-react'
import { useAtom, useSetAtom } from 'jotai'
import { useState } from 'react'

import { PATH } from '@/utils/constant/_paths'
import { projectAtom } from '@/atom/project'

import ProtectedComponent from '@/components/protected'
import { Button } from '@/components/ui/button'

import DetailProject from './_component/detail-project'
import AddProject from './_component/add-project'
import TitlePage from '../_component/title-page'
import Kanban from './_component/manage/kanban'

import { settingConfig } from '../_component/setting/setting'
import { DashboardLayout } from '../_component/layout'
import { useTitle } from '../_component/header'


const links = [
  {
    name: 'Dashboard',
    path: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Proyek',
    path: PATH.PROJECT_INDEX,
  },
  {
    name: 'Kelola',
    path: PATH.PROJECT_MANAGE,
  },
]

export default function Manage() {
  useTitle(links)

  const [selected, setSelected] = useAtom(projectAtom)
  const setSetting = useSetAtom(settingConfig)

  const [openAdd, setOpenAdd] = useState(false)

  return (
    <DashboardLayout className='overflow-hidden'>
      <TitlePage className='mb-2'>
        <div className='flex gap-4 items-center'>
          <BriefcaseBusinessIcon className='text-[#989CA8]' />
          <p className='text-dark font-medium'>Kelola</p>
        </div>
        <div className='flex gap-2 items-center'>
          <Button
            variant='secondary'
            className='w-8 p-0'
            onClick={() => setSetting({ open: true, default: 'project_label' })}
          >
            <Settings2Icon className='w-4 h-4 text-dark/70' />
          </Button>
          <ProtectedComponent required={['project:create']}>
            <Button onClick={() => setOpenAdd(!openAdd)}>Proyek Baru</Button>
          </ProtectedComponent>
        </div>
      </TitlePage>
      <div className='pt-4 pl-4'>
        <Kanban />
      </div>
      <DetailProject
        id={selected?.id}
        open={selected?.open || false}
        setOpen={() => setSelected(null)}
        withSocket
      />
      <AddProject open={openAdd} setOpen={setOpenAdd} withSocket />
    </DashboardLayout>
  )
}

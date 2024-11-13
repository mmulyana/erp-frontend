import { BriefcaseBusinessIcon, Settings2Icon } from 'lucide-react'
import { DashboardLayout } from '../_component/layout'
import TitlePage from '../_component/title-page'
import { Button } from '@/components/ui/button'
import Container from '../_component/container'
import Kanban from './_component/manage/kanban'
import Search from '@/components/common/search'
import Filter from '@/components/common/filter'
import DetailProject from './_component/detail-project'
import { useAtom } from 'jotai'
import { projectAtom } from '@/atom/project'
import { PATH } from '@/utils/constant/_paths'
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

  return (
    <DashboardLayout className='overflow-hidden'>
      <TitlePage className='mb-2'>
        <div className='flex gap-4 items-center'>
          <BriefcaseBusinessIcon className='text-[#989CA8]' />
          <p className='text-dark font-medium'>Kelola</p>
        </div>
        <div className='flex gap-2 items-center'>
          <Button variant='secondary' className='w-8 p-0'>
            <Settings2Icon className='w-4 h-4 text-dark/70' />
          </Button>
          <Button>Proyek Baru</Button>
        </div>
      </TitlePage>
      <Container className='pb-0'>
        <div className='flex gap-4 items-center mb-6'>
          <Search />
          <Filter fill='#F9A861' styleFilter='text-[#F9A861]'></Filter>
        </div>
        <Kanban />
      </Container>
      <DetailProject
        id={selected?.id}
        open={selected?.open || false}
        setOpen={() => setSelected(null)}
      />
    </DashboardLayout>
  )
}

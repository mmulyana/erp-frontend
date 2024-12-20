import { useAtom } from 'jotai'

import { PATH } from '@/utils/constant/_paths'
import { projectAtom } from '@/atom/project'
import useTour from '@/hooks/use-tour'

import Tour from '@/components/common/tour'

import ListProject from './_component/list-project'
import CardTotal from './_component/card-total'
import Container from './_component/container'
import { DashboardLayout } from './_component/layout'
import { steps } from './_component/tour-overview'
import { useTitle } from './_component/header'

import ExpireCertif from './hris/employee/_component/detail/expire-certif'
import ExpireSafety from './hris/employee/_component/detail/expire-safety'
import DetailProject from './project/_component/detail-project'

export default function Dashboard() {
  useTitle([{ name: 'Dashboard', path: PATH.DASHBOARD_OVERVIEW }])

  const [selected, setSelected] = useAtom(projectAtom)

  const { start, onTourEnd } = useTour('overview')

  return (
    <>
      <DashboardLayout>
        <Container>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 gap-y-4'>
            <div className='col-span-1 md:col-span-2 space-y-4'>
              <CardTotal />
              <ListProject />
            </div>
            <div className='flex flex-col gap-4'>
              <ExpireCertif />
              <ExpireSafety />
            </div>
          </div>
        </Container>
      </DashboardLayout>
      <DetailProject
        id={selected?.id}
        open={selected?.open || false}
        setOpen={() => setSelected(null)}
      />

      <Tour steps={steps} start={start} onTourEnd={onTourEnd} />
    </>
  )
}

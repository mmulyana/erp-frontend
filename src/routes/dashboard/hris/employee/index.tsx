import { DataTable } from '@/components/data-table'
import { columns, Data, links } from './component'
import { usePosition } from '@/hooks/api/use-position'
import { useTitle } from '../../_component/header'
import { DashboardLayout } from '../../_component/layout'
import { FilterTable, HeadTable } from '@/components/data-table/component'
import { NetworkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CardStatusEmployee from './_component/index/card-status-employee'
import CardTotalEmployee from './_component/index/card-total-employee'

export default function Employee() {
  const { data, isLoading } = usePosition()
  useTitle(links)

  return (
    <DashboardLayout>
      <div className='grid grid-cols-1 md:grid-cols-[1fr_340px]'>
        <div>
          <HeadTable>
            <div className='flex gap-4 items-center'>
              <NetworkIcon className='text-[#989CA8]' />
              <p className='text-dark font-medium'>Jabatan</p>
            </div>
            <Button>Tambah</Button>
          </HeadTable>
          <FilterTable placeholder='Cari jabatan' />
          <DataTable
            data={data?.data?.data || tableData}
            columns={columns}
            withLoading
            isLoading={isLoading}
          />
        </div>
        <div className='h-[calc(100vh-48px)] border-l border-line p-4 space-y-4'>
          <CardTotalEmployee />
          <CardStatusEmployee />
        </div>
      </div>
    </DashboardLayout>
  )
}

const tableData: Data[] = [
  {
    id: 1,
    name: 'Staf',
    description: '',
  },
]

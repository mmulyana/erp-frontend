import { useProject } from '@/hooks/api/use-project'
import { useTitle } from '../_component/header'
import { PATH } from '@/utils/constant/_paths'
import { DashboardLayout } from '../_component/layout'
import InfoRevenue from './_component/overview/info-revenue'
import InfoExpense from './_component/overview/info-expense'
import InfoStatus from './_component/overview/info-status'
import { ColumnDef } from '@tanstack/react-table'
import { Project } from '@/utils/types/api'
import { DataTable } from '@/components/data-table'
import { FilterTable, HeadTable } from '@/components/data-table/component'
import { BriefcaseBusiness } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import AddProject from './_component/add-project'

export default function Dashboard() {
  useTitle([{ name: 'Proyek', path: PATH.PROJECT_INDEX }])

  const { data, isLoading } = useProject()
  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
    },
    {
      id: 'user',
      header: 'User',
      cell: ({ row }) => <p>{row.original.client.name}</p>,
    },
    {
      id: 'pic',
      header: 'Penangung Jawab',
      cell: '-',
    },
    {
      id: 'status',
      header: 'Status',
      cell: '-',
    },
    {
      id: 'progress',
      header: 'Progress',
      cell: '-',
    },
    {
      id: 'employee_count',
      header: 'Pegawai',
      cell: ({ row }) => <p>{row.original._count.employees}</p>,
    },
    {
      accessorKey: 'budget',
      header: 'Nilai',
    },
  ]

  // handle dialog
  type Dialog = { add: boolean; delete: boolean }
  const [dialog, setDialog] = useState<Dialog>({
    add: false,
    delete: false,
  })
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const handleDialog = (type: keyof Dialog, val?: boolean) => {
    setDialog((prev) => ({ ...prev, [type]: val || false }))
    if (!val && selectedId !== null) {
      setSelectedId(null)
    }
  }

  return (
    <DashboardLayout>
      <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
        <InfoRevenue />
        <InfoExpense />
        <InfoStatus />
        <div className='col-span-1 md:col-span-3 border border-line rounded-xl overflow-hidden'>
          <HeadTable>
            <div className='flex gap-4 items-center'>
              <BriefcaseBusiness className='text-[#989CA8]' />
              <p className='text-dark font-medium'>Proyek</p>
            </div>
            <div
              className='flex gap-2 items-center'
              onClick={() => handleDialog('add', true)}
            >
              <Button>Proyek Baru</Button>
            </div>
          </HeadTable>
          <FilterTable placeholder='Cari proyek' />
          <DataTable
            columns={columns}
            data={data?.data?.data || []}
            isLoading={isLoading}
            withLoading
            withPagination
            styleFooter='border-t border-b-0'
          />
        </div>
      </div>
      <AddProject
        open={dialog.add}
        setOpen={(val) => handleDialog('add', val)}
      />
    </DashboardLayout>
  )
}

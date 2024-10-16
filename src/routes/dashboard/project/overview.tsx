import { useTitle } from '../_component/header'
import { PATH } from '@/utils/constant/_paths'
import { DashboardLayout } from '../_component/layout'
import InfoRevenue from './_component/overview/info-revenue'
import InfoStatus from './_component/overview/info-status'
import { ColumnDef } from '@tanstack/react-table'
import { Project } from '@/utils/types/api'
import { DataTable } from '@/components/data-table'
import { FilterTable, HeadTable } from '@/components/data-table/component'
import { BriefcaseBusiness } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import AddProject from './_component/add-project'
import { useProjects } from '@/hooks/api/use-project'
import DetailProject from './_component/detail-project'
import Overlay from '@/components/common/overlay'

export default function Dashboard() {
  useTitle([{ name: 'Proyek', path: PATH.PROJECT_INDEX }])

  const { data, isLoading } = useProjects()
  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ cell }) => {
        const { name, id } = cell.row.original
        return (
          <Overlay
            className='w-[200px]'
            overlay={
              <Button
                className='absolute right-0 top-1/2 -translate-y-1/2 text-sm text-[#313951] py-1 px-2 rounded-[6px] border border-[#EFF0F2] bg-white hover:shadow-sm hover:shadow-gray-200'
                onClick={() => {
                  handleDialog('detail', true)
                  setSelectedId(id)
                }}
              >
                Lihat
              </Button>
            }
          >
            <p
              className='hover:text-dark'
              onClick={() => {
                handleDialog('detail', true)
                setSelectedId(id)
              }}
            >
              {name}
            </p>
          </Overlay>
        )
      },
    },
    {
      id: 'user',
      header: 'User',
      cell: ({ row }) => <p>{row.original?.client?.name}</p>,
    },
    {
      id: 'pic',
      header: 'Penangung Jawab',
      // cell: ({ row }) => <p>{row?.employee?.fullname}</p>,
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
  type Dialog = { add: boolean; delete: boolean; detail: boolean }
  const [dialog, setDialog] = useState<Dialog>({
    add: false,
    delete: false,
    detail: false,
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
      <DetailProject
        id={selectedId}
        open={dialog.detail}
        setOpen={(val) => handleDialog('detail', val)}
      />
    </DashboardLayout>
  )
}

import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'

import { useProjects, useTotalProject } from '@/hooks/api/use-project'
import { useClient } from '@/hooks/api/use-client'
import { useApiData } from '@/hooks/use-api-data'

import { formatToRupiah } from '@/utils/formatCurrency'
import { PATH } from '@/utils/constant/_paths'
import { Project } from '@/utils/types/api'

import { FilterTable, HeadTable } from '@/components/data-table/component'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'

import DropdownEdit from '@/components/common/dropdown-edit'
import Overlay from '@/components/common/overlay'
import Chips from '@/components/common/chips'

import ProjectByStatusChart from './_component/overview/project-by-status'
import TopClientChart from './_component/overview/top-client-chart'
import DetailProject from './_component/detail-project'
import AddProject from './_component/add-project'

import ProjectAttachments from './_component/overview/project-attachments'
import { DashboardLayout } from '../_component/layout'
import { useTitle } from '../_component/header'

import {
  BriefcaseBusiness,
  HardHat,
  ListChecks,
  SquareUserRound,
} from 'lucide-react'

export default function Dashboard() {
  useTitle([{ name: 'Proyek', path: PATH.PROJECT_INDEX }])

  const { data, isLoading } = useProjects()
  const { data: totalproject } = useApiData(useTotalProject())
  const { data: clients } = useApiData(useClient())

  const columns: ColumnDef<Project>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ cell }) => {
        const { name, id } = cell.row.original
        return (
          <Overlay
            className='w-fit pr-14'
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
      cell: ({ row }) => (
        <div className='w-[120px]'>
          <p>{row?.original.lead?.fullname}</p>
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Chips
          background={row.original.boardItems.container.color}
          text={row.original?.boardItems?.container.name}
        />
      ),
    },
    {
      id: 'progress',
      header: 'Progress',
      cell: ({ row }) => (
        <div className='w-[120px] grid grid-cols-[80px_1fr] items-center gap-2'>
          <div className='w-full relative rounded-full overflow-hidden bg-gray-200 h-2'>
            <div
              className='absolute left-0 bg-blue-primary h-full'
              style={{ width: row.original.progress ?? '0' + '%' }}
            ></div>
          </div>
          <p className='font-semibold text-sm pb-0.5'>
            {row.original.progress ?? 0}%
          </p>
        </div>
      ),
    },
    {
      id: 'employee_count',
      header: 'Pegawai',
      cell: ({ row }) => <p>{row.original._count.employees}</p>,
    },
    {
      id: 'net_value',
      accessorKey: 'net_value',
      header: 'Net value',
      cell: ({ row }) => {
        if (row.original.net_value) {
          return <p>{formatToRupiah(row.original.net_value)}</p>
        }
      },
    },
    {
      id: 'action',
      header: '',
      cell: () => <DropdownEdit></DropdownEdit>,
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
        <div className='col-span-3 md:col-span-3 grid grid-cols-3 gap-4'>
          <div className='border border-line rounded-2xl flex items-center gap-5 p-2'>
            <div className='h-14 w-14 rounded-[10px] bg-blue-primary/5 flex justify-center items-center'>
              <HardHat className='text-blue-primary' size={24} />
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-dark/50 leading-none text-sm'>Total Proyek</p>
              <p className='text-dark font-medium text-xl leading-none'>
                {totalproject?.active}
              </p>
            </div>
          </div>
          <div className='border border-line rounded-2xl flex items-center gap-5 p-2'>
            <div className='h-14 w-14 rounded-[10px] bg-green-primary/5 flex justify-center items-center'>
              <ListChecks className='text-green-primary' size={24} />
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-dark/50 leading-none text-sm'>
                Total Proyek Selesai
              </p>
              <p className='text-dark font-medium text-xl leading-none'>
                {totalproject?.done}
              </p>
            </div>
          </div>
          <div className='border border-line rounded-2xl flex items-center gap-5 p-2'>
            <div className='h-14 w-14 rounded-[10px] bg-amber-50 flex justify-center items-center'>
              <SquareUserRound className='text-amber-600' size={24} />
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-dark/50 leading-none text-sm'>Total Klien</p>
              <p className='text-dark font-medium text-xl leading-none'>
                {clients?.length}
              </p>
            </div>
          </div>
        </div>
        <TopClientChart />
        <ProjectByStatusChart />
        <ProjectAttachments />
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

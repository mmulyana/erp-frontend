import { BriefcaseBusiness, Settings2Icon } from 'lucide-react'
import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'

import {
  useProjectsPagination,
  useUpdateProject,
} from '@/hooks/api/use-project'
import { useApiData } from '@/hooks/use-api-data'

import { permissionAtom } from '@/atom/permission'

import { formatToRupiah } from '@/utils/formatCurrency'
import { PATH } from '@/utils/constant/_paths'
import { Project } from '@/utils/types/api'

import { FilterTable, HeadTable } from '@/components/data-table/component'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Tab, Tabs } from '@/components/tab'

import DropdownEdit from '@/components/common/dropdown-edit'
import ProtectedComponent from '@/components/protected'
import Overlay from '@/components/common/overlay'
import Chips from '@/components/common/chips'

import TotalProjectActive from './_component/overview/total-project-active'
import ProjectByStatusChart from './_component/overview/project-by-status'
import TotalProjectDone from './_component/overview/total-project-done'
import CardAttachments from './_component/overview/card-attachments'
import TopClientChart from './_component/overview/top-client-chart'
import TotalClient from './_component/overview/total-client'
import DetailProject from './_component/detail-project'
import AddProject from './_component/add-project'

import { settingConfig } from '../_component/setting/setting'
import { DashboardLayout } from '../_component/layout'
import { useTitle } from '../_component/header'
import { TEST_ID } from '@/utils/constant/_testId'
import useTour from '@/hooks/use-tour'
import Tour from '@/components/common/tour'
import { steps } from './_component/tour-overview'

export default function Dashboard() {
  useTitle([{ name: 'Proyek', path: PATH.PROJECT_INDEX }])

  const setSetting = useSetAtom(settingConfig)
  const permission = useAtomValue(permissionAtom)

  const [url] = useUrlState({ page: '', limit: '', name: '' })

  const { mutate } = useUpdateProject()

  // handle tour
  const tours = useTour('project-overview')

  const projectActive = useApiData(
    useProjectsPagination({
      ...(url.limit !== '' ? { limit: url.limit } : undefined),
      ...(url.page !== '' ? { page: url.page } : undefined),
      ...(url.name !== '' ? { search: url.name } : undefined),
    })
  )

  const projectArchive = useApiData(
    useProjectsPagination({
      ...(url.limit !== '' ? { limit: url.limit } : undefined),
      ...(url.page !== '' ? { page: url.page } : undefined),
      ...(url.name !== '' ? { search: url.name } : undefined),
      isArchive: 'true',
    })
  )

  const columns: ColumnDef<Project>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ cell }) => {
        const { name, id } = cell.row.original
        const isAllowed = permission.includes('project:detail')
        return (
          <div className='w-[140px]'>
            <Overlay
              className='w-fit pr-14'
              overlay={
                isAllowed && (
                  <Button
                    className='absolute right-0 top-1/2 -translate-y-1/2 text-sm text-[#313951] py-1 px-2 rounded-[6px] border border-[#EFF0F2] bg-white hover:shadow-sm hover:shadow-gray-200'
                    onClick={() => {
                      handleDialog('detail', true)
                      setSelectedId(id)
                    }}
                  >
                    Lihat
                  </Button>
                )
              }
            >
              <p
                className='hover:text-dark'
                onClick={() => {
                  if (!isAllowed) return
                  handleDialog('detail', true)
                  setSelectedId(id)
                }}
              >
                {name}
              </p>
            </Overlay>
          </div>
        )
      },
    },
    {
      id: 'net_value',
      accessorKey: 'net_value',
      header: 'Net value',
      cell: ({ row }) => {
        if (row.original.net_value) {
          return <p>{formatToRupiah(row.original.net_value)}</p>
        }
        return null
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
      id: 'action',
      header: '',
      cell: ({ row }) => (
        <div className='flex justify-end'>
          <ProtectedComponent required={['project:archive', 'project:delete']}>
            <DropdownEdit>
              <ProtectedComponent required={['project:archive']}>
                <DropdownMenuItem
                  onClick={() =>
                    mutate({
                      id: row.original.id,
                      payload: { isArchive: !row.original.isArchive },
                    })
                  }
                >
                  {row.original.isArchive ? 'Kembalikan' : 'Arsipkan'}
                </DropdownMenuItem>
              </ProtectedComponent>
              <ProtectedComponent required={['project:delete']}>
                <DropdownMenuItem
                  onClick={() =>
                    mutate({
                      id: row.original.id,
                      payload: { isDeleted: true },
                    })
                  }
                >
                  Hapus
                </DropdownMenuItem>
              </ProtectedComponent>
            </DropdownEdit>
          </ProtectedComponent>
        </div>
      ),
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

  const isAllowedReadValue = permission.includes('project:read-value')

  return (
    <DashboardLayout>
      <div className='p-6 grid grid-cols-1 gap-6'>
        <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-3'>
          <TotalProjectActive />
          <TotalProjectDone />
          <TotalClient />
        </div>
        <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-3'>
          <TopClientChart />
          <ProjectByStatusChart />
          <CardAttachments />
        </div>
        <div className='col-span-full'>
          <Tabs className='px-0'>
            <Tab label='Semua' id={TEST_ID.TAB_PROJECT_ACTIVE}>
              <div className='col-span-full border border-line rounded-xl overflow-hidden mt-4'>
                <HeadTable>
                  <div className='flex gap-4 items-center'>
                    <BriefcaseBusiness className='text-[#989CA8]' />
                    <p className='text-dark font-medium'>Proyek</p>
                  </div>

                  <div className='flex gap-2 items-center'>
                    <Button
                      variant='secondary'
                      className='w-8 p-0'
                      onClick={() =>
                        setSetting({ open: true, default: 'project_label' })
                      }
                      id={TEST_ID.BUTTON_OPEN_LABEL}
                      data-testid={TEST_ID.BUTTON_OPEN_LABEL}
                    >
                      <Settings2Icon className='w-4 h-4 text-dark/70' />
                    </Button>
                    <ProtectedComponent required={['project:create']}>
                      <Button
                        onClick={() => handleDialog('add', true)}
                        id={TEST_ID.BUTTON_ADD_PROJECT_OVERVIEW}
                        data-testid={TEST_ID.BUTTON_ADD_PROJECT_OVERVIEW}
                      >
                        Proyek Baru
                      </Button>
                    </ProtectedComponent>
                  </div>
                </HeadTable>
                <FilterTable placeholder='Cari proyek' />
                <DataTable
                  columns={columns.filter((item) => {
                    if (!isAllowedReadValue) {
                      return item.id !== 'net_value'
                    }
                    return item
                  })}
                  data={projectActive.data?.data || []}
                  isLoading={projectActive.isLoading}
                  totalPages={projectActive.data?.total_pages}
                  withPagination
                  styleFooter='border-t border-b-0'
                />
              </div>
            </Tab>
            <Tab label='Arsip' id={TEST_ID.TAB_PROJECT_ARCHIVE}>
              <div className='col-span-full border border-line rounded-xl overflow-hidden mt-4'>
                <HeadTable>
                  <div className='flex gap-4 items-center'>
                    <BriefcaseBusiness className='text-[#989CA8]' />
                    <p className='text-dark font-medium'>Arsip proyek</p>
                  </div>
                </HeadTable>
                <FilterTable placeholder='Cari proyek' />
                <DataTable
                  columns={columns}
                  data={projectArchive?.data?.data || []}
                  isLoading={projectArchive.isLoading}
                  totalPages={projectArchive?.data?.total_pages}
                  withPagination
                  styleFooter='border-t border-b-0'
                />
              </div>
            </Tab>
          </Tabs>
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

      <Tour steps={steps} {...tours} />
    </DashboardLayout>
  )
}

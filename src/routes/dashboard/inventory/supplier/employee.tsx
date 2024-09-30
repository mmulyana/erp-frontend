import { generatePath, useParams } from 'react-router-dom'
import { Title, useTitle } from '../../_component/header'
import { DashboardLayout } from '../../_component/layout'
import { useMemo, useState } from 'react'
import { PATH } from '@/utils/constant/_paths'
import { ColumnDef } from '@tanstack/react-table'
import { SupplierEmployee } from '@/utils/types/api'
import Chips from '@/components/common/chips'
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-react'
import { useSupplierEmployee } from '@/hooks/api/use-supplier-employee'
import TopHeader from '../_component/top-header'
import { DataTable } from '@/components/data-table'
import Container from '../../_component/container'
import useUrlState from '@ahooksjs/use-url-state'
import { links } from './data'



export default function Employee() {
  const [url] = useUrlState({ name: '' })

  // HANDLE BREADCRUMB
  const { detail } = useParams()
  const [lastLink] = useState<any>(() => {
    if (!detail) return
    const parts = detail.split('-')
    parts.pop()
    const result = parts.join(' ')
    return {
      name: result,
      path: generatePath(PATH.EMPLOYEE_DETAIL, {
        detail: detail?.split('-').pop(),
      }),
    }
  })
  useTitle([...links, lastLink as Title])
  const positionId = detail?.split('-').pop()

  // GET DATA
  const { data: dataEmployee, isLoading } = useSupplierEmployee({
    id: Number(positionId),
    enabled: !!Number(positionId),
    ...(url.name !== '' ? { name: url.name } : { name: '' }),
  })
  const data = useMemo(() => dataEmployee?.data?.data, [isLoading])

  // COLUMN
  const columns: ColumnDef<SupplierEmployee>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
    },
    {
      accessorKey: 'position',
      header: 'Jabatan',
    },
    {
      accessorKey: 'phone',
      header: 'Kontak',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <Chips status={row.original.status} />,
    },
    {
      id: 'action',
      cell: () => (
        <div className='flex justify-end'>
          <Button
            variant='outline'
            className='p-0.5 rounded-[6px] h-5 w-5 border-[#EFF0F2]'
          >
            <Ellipsis className='w-4 h-4 text-[#313951]' />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <DashboardLayout>
      <Container className='flex flex-col gap-4'>
        <TopHeader title={lastLink.name} />
        <DataTable
          columns={columns}
          data={data || []}
          isLoading={isLoading}
          withLoading
          withPagination
        />
      </Container>
    </DashboardLayout>
  )
}

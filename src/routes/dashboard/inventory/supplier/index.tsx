import { ColumnDef } from '@tanstack/react-table'
import Container from '../../_component/container'
import { DashboardLayout } from '../../_component/layout'
import TopHeader from '../_component/top-header'
import { Supplier as SupplierType } from '@/utils/types/api'
import Chips from '@/components/common/chips'
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-react'
import { useSupplier } from '@/hooks/api/use-supplier'
import { useMemo } from 'react'
import { DataTable } from '@/components/data-table'
import Overlay from '@/components/common/overlay'
import { generatePath, Link } from 'react-router-dom'
import { PATH } from '@/utils/constant/_paths'
import { useTitle } from '../../_component/header'
import { links } from './data'

export default function Supplier() {
  useTitle(links)

  const { data: dataSupplier, isLoading } = useSupplier({})
  const data = useMemo(() => dataSupplier?.data?.data, [isLoading])

  const columns: ColumnDef<SupplierType>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ row }) => {
        const detail = row.original.name.split(' ').join('-')
        return (
          <Overlay
            className='w-fit pr-2.5'
            overlay={
              <Link
                to={generatePath(PATH.INVENTORY_SUPPLIER_EMPLOYEE, {
                  detail: `${detail}-${row.original.id}`,
                })}
                className='absolute -right-0 translate-x-full text-sm text-[#313951] py-1 px-2 rounded-[6px] border border-[#EFF0F2] top-1/2 -translate-y-1/2 bg-white hover:shadow-sm hover:shadow-gray-200'
              >
                Lihat
              </Link>
            }
          >
            <Link
              to={generatePath(PATH.INVENTORY_SUPPLIER_EMPLOYEE, {
                detail: `${detail}-${row.original.id}`,
              })}
            >
              {row?.original?.name}
            </Link>
          </Overlay>
        )
      },
    },
    {
      accessorKey: 'phone',
      header: 'Kontak',
    },
    {
      accessorKey: 'address',
      header: 'Alamat',
    },
    {
      id: 'tag',
      header: 'Tag',
      cell: ({ row }) => {
        return (
          <div className='flex gap-2 flex-wrap items-center max-w-[120px]'>
            {row.original.tags.map((item, index) => (
              <div
                key={index}
                className='text-sm px-2 py-0.5 rounded-full bg-[#4EB4CA]/10 text-[#4EB4CA]'
              >
                {item.tag.name}
              </div>
            ))}
          </div>
        )
      },
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
        <TopHeader title='Supplier' />
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

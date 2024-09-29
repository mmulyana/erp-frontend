import { Button, buttonVariants } from '@/components/ui/button'
import Container from '../_component/container'
import { DashboardLayout } from '../component'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { ColumnDef } from '@tanstack/react-table'
import { Goods } from '@/utils/types/api'
import { Ellipsis } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import ButtonLink from './_component/button-link'
import CardHighlight from './_component/card-highlight'
import CardActivity from './_component/card-activity'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useGoods } from '@/hooks/api/use-goods'
import { useMemo } from 'react'
import SearchV2 from '@/components/common/search/search-v2'
import Filter from '@/components/common/filter'
import {
  SelectItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PATH } from '@/utils/constant/_paths'
import { useTitle } from '../_component/header'

export const links = [
  {
    name: 'Inventory',
    path: PATH.INVENTORY_INDEX,
  },
]

export default function Index() {
  useTitle(links)
  
  const { data: dataGoods, isLoading } = useGoods({})
  const data = useMemo(() => dataGoods?.data?.data, [isLoading])

  const columns: ColumnDef<Goods>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ cell }) => (
        <div className='flex gap-2 items-center'>
          <p>{cell.row.original.name}</p>
          <Link
            className={cn(
              buttonVariants({ variant: 'outline' }),
              '!py-1 !px-[10px] rounded-[6px] text-xs h-fit'
            )}
            to={`/inventory/detail/${cell.row.original.id}`}
          >
            Lihat
          </Link>
        </div>
      ),
    },
    {
      id: 'measurement',
      header: 'Satuan',
      cell: ({ row }) => <p>{row.original.measurement.name}</p>,
    },
    {
      accessorKey: 'qty',
      header: 'Qty',
    },
    {
      accessorKey: 'available',
      header: 'Ketersediaan',
    },
    {
      id: 'category',
      header: 'Kategori',
      cell: ({ row }) => <p>{row.original.category.name}</p>,
    },
    {
      id: 'location',
      header: 'Lokasi',
      cell: ({ row }) => <p>{row.original.location.name}</p>,
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
      <div className='grid grid-cols-1 md:grid-cols-[1fr_380px]'>
        <Container className='flex flex-col gap-4 relative w-full overflow-auto'>
          <CardHighlight />
          <div className='pb-1.5 border-b border-[#EFF0F2] flex justify-between items-center relative'>
            <div className='relative px-2'>
              <p className='text-[#313951] font-medium'>Barang</p>
              <div className='w-full h-0.5 bg-[#5463E8] absolute -bottom-2.5 left-0'></div>
            </div>
            <div className='flex gap-2 items-center'>
              <SearchV2 />
              <Filter>
                <div className='flex flex-col gap-2'>
                  <Select>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Kategori' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Kategori</SelectLabel>
                        <SelectItem value='apple'>Mesin Bor</SelectItem>
                        <SelectItem value='banana'>Cat</SelectItem>
                        <SelectItem value='blueberry'>Kuas</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </Filter>
              <Button className=''>Tambah Data</Button>
            </div>
          </div>
          <ScrollArea className='w-full'>
            <DataTable
              columns={columns}
              data={data || []}
              isLoading={isLoading}
              withLoading
              withPagination
            />
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
          <div className='absolute right-0 top-0 h-full w-[1px] bg-[#EFF0F2]' />
        </Container>
        <Container>
          <div className='flex gap-3.5 items-center mb-4'>
            <p>Aktivitas Terkini</p>
            <ButtonLink />
          </div>
          <div>
            <ScrollArea className='h-[calc(100vh-128px)] pr-4'>
              <CardActivity type='in' />
              <CardActivity type='out' />
              <CardActivity type='in' />
              <CardActivity type='in' isLast />
            </ScrollArea>
          </div>
        </Container>
      </div>
    </DashboardLayout>
  )
}

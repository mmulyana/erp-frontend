import { Button, buttonVariants } from '@/components/ui/button'
import Container from '../_component/container'
import { DashboardLayout } from '../component'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { ColumnDef } from '@tanstack/react-table'
import { Goods } from '@/utils/types/api'
import { Ellipsis } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import ButtonLink from './_component/button-link'
import CardHighlight from './_component/card-highlight'
import CardActivity from './_component/card-activity'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Index() {
  const navigate = useNavigate()

  const columns: ColumnDef<Goods>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ cell }) => (
        <>
          <p>{cell.row.original.name}</p>
          <Link
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'py-1 px-[10px] rounded-[6px]'
            )}
            to={`/inventory/detail/${cell.row.original.id}`}
          >
            Lihat
          </Link>
        </>
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
      cell: ({ row }) => (
        <>
          <Button variant='outline' className='p-0.5 rounded-[6px]'>
            <Ellipsis className='w-4 h-4 text-[#313951]' />
          </Button>
        </>
      ),
    },
  ]

  return (
    <DashboardLayout>
      <div className='grid grid-cols-1 md:grid-cols-[1fr_380px]'>
        <Container className='flex flex-col gap-4 relative'>
          <CardHighlight />
          <DataTable columns={columns} data={[]} />
        </Container>
        <Container>
          <div className='flex gap-3.5 items-center mb-4'>
            <p>Aktivitas Terkini</p>
            <ButtonLink />
          </div>
          <div className='flex flex-col'>
            <ScrollArea className='h-[calc(100vh-108px)]'>
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

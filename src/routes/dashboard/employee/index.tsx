import { Input } from '@/components/ui/input'
import { DashboardLayout, Header } from '../component'
import { ChevronDown, Ellipsis, Search, Table } from 'lucide-react'
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Container } from './component'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/data-table'
import { usePosition } from '@/utils/api/user-position'

type Data = {
  id: number
  name: string
  description?: string
  employee?: {
    imgs: string[]
    count: number
  }
}

export default function Employee() {
  const { data, isLoading } = usePosition()
  return (
    <DashboardLayout>
      <Header subtitle='SDM' title='Pegawai'></Header>
      <Container>
        <TableHeader />
        <DataTable
          data={data?.data?.data || []}
          columns={columns}
          withLoading
          isLoading={isLoading}
        />
      </Container>
    </DashboardLayout>
  )
}

function TableHeader() {
  return (
    <div className='flex justify-between items-center mb-4'>
      <div className='flex gap-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input placeholder='Search' className='pl-8 text-sm h-fit py-2' />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='flex justify-between items-center px-3 gap-4 text-[#313951]'
            >
              <div className='flex gap-2 items-center'>
                <Table className='w-4 h-4 text-[#7277F6]' />
                Ganti Tampilan
              </div>
              <ChevronDown className='w-4 h-4 text-[#989CA8]' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-full right-0'>
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button>Buat Posisi Baru</Button>
    </div>
  )
}

export const columns: ColumnDef<Data>[] = [
  {
    header: '#',
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: 'name',
    header: 'Nama',
  },
  {
    header: 'Pegawai',
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
  },
  {
    id: 'action',
    header: '',
    size: 24,
    cell: () => (
      <div className='flex justify-end w-full'>
        <Ellipsis className='w-6 h-6 text-[#313951]/50' />
      </div>
    ),
  },
]

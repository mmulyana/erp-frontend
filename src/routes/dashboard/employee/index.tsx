import { Input } from '@/components/ui/input'
import { Breadcrumb, DashboardLayout, Header } from '../component'
import { ChevronDown, Ellipsis, Search, Table } from 'lucide-react'
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Container } from './component'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/data-table'
import { useCreatePosition, usePosition } from '@/utils/api/user-position'
import { PATH } from '@/utils/constant/_paths'
import { useEffect, useState } from 'react'
import ResponsiveModal from '@/components/responsive-modal.tsx'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { delay } from '@/utils/delay'

export default function Employee() {
  const { data, isLoading } = usePosition()
  return (
    <DashboardLayout>
      <Header subtitle='SDM' title='Pegawai'></Header>
      <Container>
        <Breadcrumb links={links} />
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
    <div className='flex justify-between items-center mt-6 mb-4'>
      <div className='flex gap-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search'
            className='pl-8 text-sm h-fit py-2 shadow'
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='flex justify-between items-center px-3 gap-4 text-[#313951] shadow h-fit'
            >
              <div className='flex gap-2 items-center'>
                <Table className='w-4 h-4 text-[#7277F6]' />
                Ganti Tampilan
              </div>
              <ChevronDown className='w-4 h-4 text-[#989CA8]' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-full right-0'>
            <DropdownMenuLabel>Tampilan</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Tabel</DropdownMenuItem>
              <DropdownMenuItem>Grid</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ModalAdd />
    </div>
  )
}

type Position = z.infer<typeof positionSchema>

function ModalAdd() {
  const [open, setOpen] = useState(false)
  const { mutate } = useCreatePosition()

  const form = useForm<Position>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const onSubmit = async (data: Position) => {
    mutate(data, {
      onSuccess: () => {
        delay(400).then(() => setOpen(false))
      },
    })
  }

  useEffect(() => {
    if (!open) form.reset()
  }, [open])

  return (
    <>
      <Button onClick={() => setOpen(true)}>Buat Posisi Baru</Button>
      <ResponsiveModal
        isOpen={open}
        setIsOpen={setOpen}
        title='Posisi baru'
        body='Tambahkan posisi baru'
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-4 px-1 pb-8 md:pb-0'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder='Nama posisi' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end mt-4'>
              <Button type='submit'>Simpan</Button>
            </div>
          </form>
        </Form>
      </ResponsiveModal>
    </>
  )
}

type Data = {
  id: number
  name: string
  description?: string
  employee?: {
    imgs: string[]
    count: number
  }
}

const links = [
  {
    name: 'Dashboard',
    href: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Pegawai',
    href: PATH.EMPLOYEE,
  },
]

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='border-none'>
            <Button variant='outline'>
              <Ellipsis className='w-6 h-6 text-[#313951]/50' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-full right-0'>
            <DropdownMenuGroup>
              <DropdownMenuItem>Ubah</DropdownMenuItem>
              <DropdownMenuItem>Hapus</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]

const positionSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})

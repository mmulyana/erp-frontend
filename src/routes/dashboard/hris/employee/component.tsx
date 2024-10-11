import { Input } from '@/components/ui/input'
import {
  ChevronDown,
  ListIcon,
  PencilIcon,
  Search,
  Table,
  TrashIcon,
} from 'lucide-react'
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button, buttonVariants } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import {
  useCreatePosition,
  useDeletePosition,
  useDetailPosition,
  useUpdatePosition,
} from '@/hooks/api/use-position'
import { cn } from '@/utils/cn'
import { useEffect, useState } from 'react'
import ResponsiveModal from '@/components/modal-responsive'
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { generatePath, Link } from 'react-router-dom'
import { PATH } from '@/utils/constant/_paths'
import DropdownEdit from '@/components/common/dropdown-edit'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Card, Cardbody, CardHead } from '@/components/common/card-v1'
import { Label, Pie, PieChart } from 'recharts'

const positionSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})

type Position = z.infer<typeof positionSchema>

export type Data = {
  id: number
  name: string
  description?: string
}

export function TableHeader() {
  const [isOpen, setIsOpen] = useState(false)

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
      <Button onClick={() => setIsOpen(true)} className='py-1'>
        Tambah Jabatan
      </Button>
      <ModalAdd open={isOpen} setOpen={setIsOpen} />
    </div>
  )
}

type ModalProps = {
  id?: number
  open: boolean
  setOpen: (val: boolean) => void
}

function ModalAdd({ id, open, setOpen }: ModalProps) {
  const { mutate: create } = useCreatePosition()
  const { mutate: update } = useUpdatePosition()
  const { data, isLoading } = useDetailPosition(id)

  const form = useForm<Position>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const onSubmit = async (data: Position) => {
    if (!!id) {
      update(
        { ...data, id },
        {
          onSuccess: () => {
            delay(400).then(() => setOpen(false))
          },
        }
      )
      return
    }
    create(data, {
      onSuccess: () => {
        delay(400).then(() => setOpen(false))
      },
    })
  }

  useEffect(() => {
    if (!open) form.reset()
  }, [open])

  useEffect(() => {
    if (!id) return
    if (!isLoading && !!data?.data) {
      console.log(data?.data)
      form.setValue('name', data?.data?.data?.name)
      form.setValue('description', data?.data?.data?.description || '')
    }
  }, [id, isLoading, data])

  return (
    <>
      <ResponsiveModal
        isOpen={open}
        setIsOpen={setOpen}
        title={!!id ? 'Edit Posisi' : 'Posisi baru'}
        body={!!id ? 'Edit posisi ini' : 'Tambahkan posisi baru'}
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

function ModalDelete({ id, open, setOpen }: ModalProps) {
  const { mutate } = useDeletePosition()
  const onDelete = async () => {
    if (!id) return
    mutate(
      { id },
      {
        onSuccess: () => {
          delay(400).then(() => setOpen(false))
        },
      }
    )
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus posisi ini?</AlertDialogTitle>
          <AlertDialogDescription>
            Posisi ini akan dihapus dari database
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className={cn(buttonVariants({ variant: 'destructive' }))}
          >
            Lanjutkan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: 'name',
    header: 'Nama',
    cell: ({ cell }) => {
      return (
        <Link
          to={generatePath(PATH.EMPLOYEE_DETAIL, {
            detail: `${cell.row.original.name.split(' ').join('-')}-${
              cell.row.original.id
            }`,
          })}
        >
          {cell.row.original.name}
        </Link>
      )
    },
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
  },
  {
    id: 'action',
    accessorKey: 'id',
    header: '',
    size: 24,
    cell: ({ cell }) => {
      const [isEdit, setIsEdit] = useState(false)
      const [isDelete, setIsDelete] = useState(false)

      return (
        <div className='flex justify-end w-full'>
          <DropdownEdit>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setIsEdit(true)}
                className='flex items-center gap-2 cursor-pointer'
              >
                <PencilIcon className='w-4 h-4 text-blue-400' />
                Ubah
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDelete(true)}
                className='flex items-center gap-2 cursor-pointer'
              >
                <TrashIcon className='w-4 h-4 text-red-500' />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownEdit>
          <ModalAdd
            id={cell.row.original.id}
            open={isEdit}
            setOpen={setIsEdit}
          />
          <ModalDelete
            id={cell.row.original.id}
            open={isDelete}
            setOpen={setIsDelete}
          />
        </div>
      )
    },
  },
]

export const links = [
  {
    name: 'Dashboard',
    path: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Pegawai',
    path: PATH.EMPLOYEE,
  },
]

export const chartData1 = [
  { position: 'staff', count: 8, fill: '#274754' },
  { position: 'tukang', count: 20, fill: '#2A9D90' },
  { position: 'helper', count: 28, fill: '#F4A462' },
]
export const chartConfig1 = {
  visitors: {
    label: 'Pegawai',
  },
  staff: {
    label: 'Staff',
    color: 'hsl(var(--chart-1))',
  },
  tukang: {
    label: 'Tukang',
    color: 'hsl(var(--chart-2))',
  },
  helper: {
    label: 'Helper',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig

export function CardTotalEmployee({ total }: { total: number }) {
  return (
    <Card>
      <CardHead>
        <p className='text-dark text-sm font-semibold'>Jumlah pegawai</p>
      </CardHead>
      <Cardbody className='pt-0'>
        <ChartContainer
          config={chartConfig1}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData1}
              dataKey='count'
              nameKey='position'
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          Pegawai
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </Cardbody>
    </Card>
  )
}

export const chartData2 = [
  { status: 'active', count: 42, fill: '#5463E8' },
  { status: 'nonactive', count: 8, fill: '#274754' },
]
export const chartConfig2 = {
  visitors: {
    label: 'Pegawai',
  },
  active: {
    label: 'Aktif',
    color: 'hsl(var(--chart-1))',
  },
  nonactive: {
    label: 'Tidak Aktif',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export function CardStatusEmployee() {
  return (
    <Card>
      <CardHead>
        <p className='text-dark text-sm font-semibold'>Jumlah pegawai</p>
      </CardHead>
      <Cardbody className='pt-0'>
        <ChartContainer
          config={chartConfig2}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData2}
              dataKey='count'
              nameKey='status'
              innerRadius={60}
              strokeWidth={5}
            ></Pie>
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </Cardbody>
    </Card>
  )
}

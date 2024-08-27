import { Input } from '@/components/ui/input'
import {
  ChevronDown,
  Ellipsis,
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
} from '@/hooks/use-position'
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

const positionSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})

type Position = z.infer<typeof positionSchema>

export type Data = {
  id: number
  name: string
  description?: string
  _count: {
    employees: number
  }
  employees: { fullname: string }[]
}

export function Container({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return <div className={cn('py-4 px-8', className)}>{children}</div>
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
    header: '#',
    cell: (info) => info.row.index + 1,
  },
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
    header: 'Pegawai',
    cell: ({ cell }) => {
      if (cell.row.original._count.employees == 0) return null
      return (
        <div className='flex gap-2 items-center'>
          <div className='flex'>
            {cell.row.original.employees.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className='w-6 h-6 bg-blue-700 text-white relative rounded-full'
              >
                <span className='text-xs absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                  {item.fullname.at(0)}
                </span>
              </div>
            ))}
          </div>
          <div className='h-1 w-1 rounded-full bg-[#313951]/50'></div>
          <p className='text-sm text-[#313951]'>
            {cell.row.original._count.employees} Orang
          </p>
        </div>
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
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className='border-transparent hover:border-gray-200'
            >
              <Button variant='outline' className='p-0 h-fit rounded px-0.5'>
                <Ellipsis className='w-6 h-6 text-[#313951]/70' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-full right-0'>
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
            </DropdownMenuContent>
          </DropdownMenu>
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

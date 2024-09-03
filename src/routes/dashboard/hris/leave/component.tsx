import ResponsiveModal from '@/components/modal-responsive'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useEmployees } from '@/hooks/use-employee'
import { useCreateLeaves } from '@/hooks/use-leaves'
import { leaveSchema, LeaveSchema } from '@/utils/schema/leave.schema'
import { Employee } from '@/utils/types/employee'
import { Leave } from '@/utils/types/leave'
import { zodResolver } from '@hookform/resolvers/zod'
import { ColumnDef } from '@tanstack/react-table'
import { format, intervalToDuration } from 'date-fns'
import { Ellipsis } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function ModalAdd() {
  const [isOpen, setIsOpen] = useState(false)

  const { data: employees } = useEmployees({}, { enabled: isOpen })
  const { mutate } = useCreateLeaves()

  const form = useForm<LeaveSchema>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      leaveType: '',
      description: '',
    },
  })

  const submit = async (data: LeaveSchema) => {
    mutate(
      { ...data, employeeId: Number(data.employeeId) },
      {
        onSuccess: async () => {
          setIsOpen(false)
        },
      }
    )
  }

  return (
    <>
      <Button className='h-8' onClick={() => setIsOpen(true)}>
        Tambah data
      </Button>
      <ResponsiveModal title='' isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <FormField
              control={form.control}
              name='employeeId'
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field?.value?.toString()}
                >
                  <SelectTrigger className='w-full rounded-xl shadow-sm shadow-gray-950/10 border border-[#DEE0E3]'>
                    <SelectValue placeholder='Pilih pegawai' />
                  </SelectTrigger>
                  <SelectContent>
                    {employees?.data?.data?.map(
                      (emp: Employee & { id: number }) => (
                        <SelectItem key={emp.id} value={emp?.id?.toString()}>
                          {emp.fullname}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => <Input {...field} type='date' />}
              />
              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => <Input {...field} type='date' />}
              />
            </div>
              <FormField
                control={form.control}
                name='leaveType'
                render={({ field }) => <Input {...field} />}
              />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <Textarea placeholder='Keterangan' {...field} />
              )}
            />
            <Button type='submit'>Simpan</Button>
          </form>
        </Form>
      </ResponsiveModal>
    </>
  )
}

export const columns: ColumnDef<Leave>[] = [
  {
    id: 'nama',
    header: 'Nama',
    cell: ({ cell }) => {
      return <p>{cell.row.original.employee.fullname}</p>
    },
  },
  {
    accessorKey: 'leaveType',
    header: 'Tipe',
    
  },
  {
    accessorKey: 'startDate',
    header: 'Dari tanggal',
    cell: ({ row }) => {
      return <p>{format(row.original.startDate, 'dd/MM/yyyy')}</p>
    },
  },
  {
    accessorKey: 'endDate',
    header: 'Sampai tanggal',
    cell: ({ row }) => {
      return <p>{format(row.original.endDate, 'dd/MM/yyyy')}</p>
    },
  },
  {
    id: 'duration',
    header: 'Durasi',
    cell: ({ row }) => {
      const { days } = intervalToDuration({
        start: new Date(row.original.startDate),
        end: new Date(row.original.endDate),
      })
      return <p>{days}</p>
    },
  },
  {
    accessorKey: 'description',
    header: 'Keterangan',
  },
  {
    id: 'action',
    cell: () => (
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
          <DropdownMenuContent className='w-full right-0'></DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]

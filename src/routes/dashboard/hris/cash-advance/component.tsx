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
import { useCreateCashAdvance } from '@/hooks/use-cash-advance'
import { useEmployees } from '@/hooks/use-employee'
import {
  cashAdvanceSchema,
  CashAdvancesSchema,
} from '@/utils/schema/cash-advances.schema'
import { CashAdvance } from '@/utils/types/cash-advance'
import { Employee } from '@/utils/types/employee'
import { zodResolver } from '@hookform/resolvers/zod'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Ellipsis } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function ModalAdd() {
  const [isOpen, setIsOpen] = useState(false)

  const { data: employees } = useEmployees({}, { enabled: isOpen })
  const { mutate } = useCreateCashAdvance()

  const form = useForm<CashAdvancesSchema>({
    resolver: zodResolver(cashAdvanceSchema),
    defaultValues: {
      amount: 0,
      description: '',
    },
  })

  const submit = async (data: CashAdvancesSchema) => {
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
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <Input
                  {...field}
                  type='number'
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  onBlur={(e) => {
                    field.onBlur()
                    if (isNaN(e.target.valueAsNumber)) {
                      form.setValue('amount', 0)
                    }
                  }}
                />
              )}
            />
            <FormField
              control={form.control}
              name='requestDate'
              render={({ field }) => (
                <Input {...field} className='block' type='date' />
              )}
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

export const columns: ColumnDef<CashAdvance>[] = [
  {
    id: 'nama',
    header: 'Nama',
    cell: ({ cell }) => {
      return <p>{cell.row.original.employee.fullname}</p>
    },
  },
  {
    accessorKey: 'amount',
    header: 'Jumlah',
    cell: ({ cell }) => {
      return <p>Rp {cell.row.original.amount}</p>
    },
  },
  {
    accessorKey: 'requestDate',
    header: 'Tanggal',
    cell: ({ cell }) => {
      return (
        <p>
          {format(cell.row.original.requestDate, 'EEEE, dd/MM/yy', {
            locale: id,
          })}
        </p>
      )
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

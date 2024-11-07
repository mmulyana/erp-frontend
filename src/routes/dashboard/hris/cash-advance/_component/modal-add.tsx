import Modal, { ModalContainer } from '@/components/modal-v2'
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
import {
  useCreateCashAdvance,
  useDetailCashAdvance,
  useUpdateCashAdvance,
} from '@/hooks/api/use-cash-advance'
import { useAllEmployees } from '@/hooks/api/use-employee'
import { useApiData } from '@/hooks/use-api-data'
import { Employee } from '@/utils/types/api'
import { createCashAdvance } from '@/utils/types/form'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
}

export function ModalAdd({ open, setOpen, id }: Props) {
  const { data: employees } = useApiData(useAllEmployees({ enabled: open }))
  const { data, isLoading } = useDetailCashAdvance({
    id,
    enabled: open && !!id,
  })

  const { mutate: create } = useCreateCashAdvance()
  const { mutate: update } = useUpdateCashAdvance()

  const form = useForm<createCashAdvance>({
    defaultValues: {
      employeeId: null,
      amount: 0,
      description: '',
      requestDate: new Date().toISOString().split('T')[0],
    },
  })

  const submit = async (payload: createCashAdvance) => {
    if (id) {
      update(
        { id, payload },
        {
          onSuccess: () => {
            setOpen(false)
          },
        }
      )
      return
    }
    create(
      {
        ...payload,
        employeeId: Number(payload.employeeId),
        requestDate: new Date(payload.requestDate).toISOString().split('T')[0],
      },
      {
        onSuccess: () => {
          setOpen(false)
        },
      }
    )
  }

  useEffect(() => {
    if (!open) {
      form.reset({
        employeeId: null,
        amount: 0,
        description: '',
        requestDate: new Date().toISOString().split('T')[0],
      })
    }
  }, [open, form])

  useEffect(() => {
    if (id && open && !isLoading && data?.data.data) {
      const { amount, description, employeeId, requestDate } = data.data.data

      form.reset({
        amount: Number(amount),
        description,
        employeeId,
        requestDate: new Date(requestDate).toISOString().split('T')[0],
      })
    }
  }, [open, isLoading, data, id, form])

  return (
    <Modal title='Kasbon Baru' open={open} setOpen={setOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className='space-y-4'>
          <ModalContainer setOpen={setOpen}>
            <FormField
              control={form.control}
              name='employeeId'
              label='Pegawai'
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString()}
                >
                  <SelectTrigger className='w-full rounded-xl shadow-sm shadow-gray-950/10 border border-[#DEE0E3]'>
                    <SelectValue placeholder='Pilih pegawai' />
                  </SelectTrigger>
                  <SelectContent>
                    {employees?.map((emp: Employee & { id: number }) => (
                      <SelectItem key={emp.id} value={emp.id.toString()}>
                        {emp.fullname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='amount'
                label='Jumlah'
                render={({ field }) => (
                  <Input
                    type='number'
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    value={field.value}
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
                label='Tanggal'
                render={({ field }) => (
                  <Input
                    type='date'
                    value={
                      typeof field.value === 'string'
                        ? field.value
                        : field.value.toISOString().split('T')[0]
                    }
                    onChange={(e) => field.onChange(e.target.value)}
                    className='block'
                  />
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='description'
              label='Deskripsi'
              render={({ field }) => (
                <Textarea
                  placeholder='Keterangan'
                  {...field}
                  value={field.value || ''}
                />
              )}
            />
          </ModalContainer>
        </form>
      </Form>
    </Modal>
  )
}

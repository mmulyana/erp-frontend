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
import { useCreateCashAdvance } from '@/hooks/api/use-cash-advance'
import { useAllEmployees } from '@/hooks/api/use-employee'
import { useApiData } from '@/hooks/use-api-data'
import { Employee } from '@/utils/types/api'
import { useEffect } from 'react'

import { useForm } from 'react-hook-form'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}
export function ModalAdd({ open, setOpen }: Props) {
  const { data: employees } = useApiData(useAllEmployees({ enabled: open }))
  const { mutate } = useCreateCashAdvance()

  const form = useForm({
    defaultValues: {
      amount: 0,
      description: '',
      employeeId: '',
      requestDate: new Date().toDateString(),
    },
  })

  const submit = async (data: any) => {
    mutate(
      { ...data, employeeId: Number(data.employeeId) },
      {
        onSuccess: async () => {
          setOpen(false)
        },
      }
    )
  }
  useEffect(() => {
    if (!open) {
      form.reset()
    }
  }, [open])

  return (
    <>
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
                    onValueChange={field.onChange}
                    value={field?.value?.toString()}
                  >
                    <SelectTrigger className='w-full rounded-xl shadow-sm shadow-gray-950/10 border border-[#DEE0E3]'>
                      <SelectValue placeholder='Pilih pegawai' />
                    </SelectTrigger>
                    <SelectContent>
                      {employees?.map((emp: Employee & { id: number }) => (
                        <SelectItem key={emp.id} value={emp?.id?.toString()}>
                          {emp.fullname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FormField
                control={form.control}
                name='amount'
                label='Jumlah'
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
                label='Tanggal'
                render={({ field }) => (
                  <Input {...field} className='block' type='date' />
                )}
              />
              <FormField
                control={form.control}
                name='description'
                label='Deskripsi'
                render={({ field }) => (
                  <Textarea placeholder='Keterangan' {...field} />
                )}
              />
            </ModalContainer>
          </form>
        </Form>
      </Modal>
    </>
  )
}

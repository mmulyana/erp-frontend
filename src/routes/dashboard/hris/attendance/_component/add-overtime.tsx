import Modal, { ModalContainer } from '@/components/modal-v2'
import { Button } from '@/components/ui/button'
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
import { useEmployees } from '@/hooks/api/use-employee'
import { useCreateOvertime } from '@/hooks/api/use-overtime'
import { Employee } from '@/utils/types/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type OvertimeSchema = z.infer<typeof overtimeSchema>
export const overtimeSchema = z.object({
  employeeId: z.string(),
  date: z.string(),
  total_hour: z.number(),
  description: z.string().optional(),
})

export function AddOvertime() {
  const [isOpen, setIsOpen] = useState(false)

  const { data: employees } = useEmployees({}, { enabled: isOpen })
  const { mutate } = useCreateOvertime()

  const form = useForm<OvertimeSchema>({
    resolver: zodResolver(overtimeSchema),
    defaultValues: {
      total_hour: 0,
      date: '',
      description: undefined,
    },
  })

  const submit = async (data: OvertimeSchema) => {
    mutate(
      {
        ...data,
        employeeId: Number(data.employeeId),
        date: new Date(format(data.date, 'yyyy-MM-dd')),
      },
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
      <Modal title='Lemburan' open={isOpen} setOpen={setIsOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <ModalContainer setOpen={setIsOpen}>
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
                name='date'
                render={({ field }) => (
                  <Input {...field} className='block' type='date' />
                )}
              />
              <FormField
                control={form.control}
                name='total_hour'
                render={({ field }) => (
                  <Input
                    {...field}
                    type='number'
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    onBlur={(e) => {
                      field.onBlur()
                      if (isNaN(e.target.valueAsNumber)) {
                        form.setValue('total_hour', 0)
                      }
                    }}
                  />
                )}
              />

              <FormField
                control={form.control}
                name='description'
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

import SelectV1 from '@/components/common/select/select-v1'
import Modal, { ModalContainer } from '@/components/modal-v2'
import { Button } from '@/components/ui/button'
import { CommandItem } from '@/components/ui/command'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useEmployees } from '@/hooks/api/use-employee'
import { useCreateOvertime } from '@/hooks/api/use-overtime'
import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import { BASE_URL } from '@/utils/constant/_urls'
import useUrlState from '@ahooksjs/use-url-state'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parse } from 'date-fns'
import { Pencil, UserCircle, UserIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type OvertimeSchema = z.infer<typeof overtimeSchema>
export const overtimeSchema = z.object({
  employeeId: z.number(),
  date: z.string(),
  total_hour: z.number(),
  description: z.string().optional(),
})

export function AddOvertime() {
  const [isOpen, setIsOpen] = useState(false)
  const [url] = useUrlState({ date: '' })
  const { data: employees } = useEmployees({ enabled: isOpen })
  const { mutate } = useCreateOvertime()

  useEffect(() => {
    if (url.date !== '') {
      const parsedDate = parse(url.date, 'dd-MM-yyyy', new Date())
      form.setValue('date', format(parsedDate, 'yyyy-MM-dd'))
    }
  }, [url.date])

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
        date: format(data.date, 'dd-MM-yyyy'),
      },
      {
        onSuccess: async () => {
          setIsOpen(false)
        },
      }
    )
  }

  // HANDLE SELECT
  const [openSelect, setOpenSelect] = useState(false)
  useFixPointerEvent(openSelect)

  return (
    <>
      <Button className='h-8' onClick={() => setIsOpen(true)}>
        Tambah data
      </Button>
      <Modal title='Lemburan' open={isOpen} setOpen={setIsOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <ModalContainer setOpen={setIsOpen}>
              {/* <FormField
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
              /> */}
              <SelectV1
                open={openSelect}
                setOpen={setOpenSelect}
                classNameBtn='flex-1'
                name='employeeId'
                customPlaceholder={
                  <div className='inline-flex flex-1 gap-1 items-center border border-dashed border-dark/40 hover:bg-line/50 px-3 py-1.5 rounded-full'>
                    <UserIcon className='w-4 h-4' />
                    <span className='text-sm text-dark/50'>Pilih Pegawai</span>
                  </div>
                }
                preview={(val) => {
                  const employeeData = employees?.data?.data
                  const index = employeeData
                    ? employeeData.findIndex((item) => item.id === Number(val))
                    : -1

                  const photo =
                    employeeData && index !== -1
                      ? employeeData[index]?.photo
                      : null

                  const fullname =
                    employeeData && index !== -1
                      ? employeeData[index]?.fullname
                      : null

                  return (
                    <div className='flex gap-1 items-center'>
                      <div className='inline-flex gap-2 items-center'>
                        {photo ? (
                          <img
                            className='h-8 w-8 rounded-full object-cover object-center'
                            src={BASE_URL + '/img/' + photo}
                          />
                        ) : (
                          <div className='w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center'>
                            <UserCircle size={18} />
                          </div>
                        )}
                        <span className='text-dark font-dark font-medium text-lg'>
                          {fullname}
                        </span>
                      </div>
                      <Button
                        variant='ghost'
                        type='button'
                        className='rounded-full font-normal text-sm p-1 h-fit'
                        onClick={() => {
                          setOpenSelect(true)
                        }}
                      >
                        <Pencil size={16} />
                      </Button>
                    </div>
                  )
                }}
              >
                {employees?.data?.data?.map((item: any) => (
                  <CommandItem
                    key={item.id}
                    className='hover:bg-red-400'
                    value={item.id.toString()}
                    onSelect={(value) => {
                      form.setValue('employeeId', Number(value))
                      setOpenSelect(false)
                    }}
                  >
                    <span className='px-2 py-0.5 flex gap-1 items-center'>
                      {item?.photo ? (
                        <img
                          className='h-6 w-6 rounded-full object-cover object-center'
                          src={BASE_URL + '/img/' + item.photo}
                        />
                      ) : (
                        <div className='w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center'>
                          <UserCircle size={16} />
                        </div>
                      )}
                      {item.fullname}
                    </span>
                  </CommandItem>
                ))}
              </SelectV1>
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
                label='Total jam lembur'
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

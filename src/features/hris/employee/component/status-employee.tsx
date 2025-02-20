import { RadioV2 } from '@/components/common/radio-v2'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useStatusEmployee } from '@/features/hris/employee/api/use-employee'
import { cn } from '@/utils/cn'
import { Employee } from '@/utils/types/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  description: z.string().optional(),
  option: z.string().optional(),
})

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  employee: Pick<Employee, 'id' | 'status'>
}

type TForm = {
  description: string
  option: string
}

export default function StatusEmployee({ open, setOpen, employee }: Props) {
  const { mutate: changeStatus } = useStatusEmployee()
  const [next, setNext] = useState(false)

  const form = useForm<TForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      option: '',
    },
    mode: 'onSubmit',
  })

  const submit = (data: TForm) => {
    let description = data.option
    if (data.option === 'lain-lain') {
      description = data.description
    }

    changeStatus(
      { id: employee.id, status: employee?.status, description },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      }
    )
  }

  const option = form.watch('option')

  useEffect(() => {
    if (!open) setNext(false)
  }, [open])

  if (!open) return null

  return (
    <div className='w-full h-screen absolute top-0 left-0 bg-white/50 backdrop-blur-md z-10 flex items-center justify-center px-8'>
      <div className='w-[240px] max-w-full flex flex-col justify-center'>
        {next ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
              <div className='flex flex-col gap-2'>
                <FormField
                  name='option'
                  control={form.control}
                  render={({ field }) => (
                    <div className='flex justify-between items-start flex-col gap-2'>
                      <p className='text-dark font-medium'>
                        Alasan penonaktifan
                      </p>
                      <RadioV2
                        {...field}
                        value='berhenti'
                        checked={field.value === 'berhenti'}
                      >
                        {(checked) => (
                          <div className='flex gap-2 items-center'>
                            <div
                              className={cn(
                                'w-4 h-4 rounded-full border-[4px]',
                                checked && 'border-blue-primary'
                              )}
                            />
                            <p>Berhenti</p>
                          </div>
                        )}
                      </RadioV2>
                      <RadioV2
                        {...field}
                        value='efisiensi'
                        checked={field.value === 'efisiensi'}
                      >
                        {(checked) => (
                          <div className='flex gap-2 items-center'>
                            <div
                              className={cn(
                                'w-4 h-4 rounded-full border-[4px]',
                                checked && 'border-blue-primary'
                              )}
                            />
                            <p>Efisiensi</p>
                          </div>
                        )}
                      </RadioV2>
                      <RadioV2
                        {...field}
                        value='lain-lain'
                        checked={field.value === 'lain-lain'}
                      >
                        {(checked) => (
                          <div className='flex gap-2 items-center'>
                            <div
                              className={cn(
                                'w-4 h-4 rounded-full border-[4px]',
                                checked && 'border-blue-primary'
                              )}
                            />
                            <p>Lainnya</p>
                          </div>
                        )}
                      </RadioV2>
                      {option == 'lain-lain' && (
                        <div className='pl-6 w-full'>
                          <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                              <Textarea
                                placeholder='isi alasan penonaktifan'
                                className='w-full'
                                {...field}
                              />
                            )}
                          />
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className='flex gap-3 items-center justify-end mt-4'>
                <Button
                  type='button'
                  variant='secondary'
                  onClick={() => {
                    setOpen(false)
                    form.reset()
                  }}
                >
                  Batal
                </Button>
                <Button variant='default'>Simpan</Button>
              </div>
            </form>
          </Form>
        ) : (
          <>
            <p className='text-lg text-center font-medium text-dark'>
              {employee.status ? 'Nonaktifkan' : 'Aktifkan'} pegawai ini
            </p>
            <div className='flex gap-3 items-center justify-center mt-4'>
              <Button
                variant='secondary'
                onClick={() => {
                  setOpen(false)
                  form.reset()
                }}
              >
                Batal
              </Button>
              <Button
                variant='default'
                onClick={() => {
                  if (employee.status) {
                    setNext(true)
                    return
                  }
                  changeStatus(
                    { id: employee.id, status: employee?.status },
                    {
                      onSuccess: () => {
                        setOpen(false)
                      },
                    }
                  )
                }}
              >
                Lanjutkan
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

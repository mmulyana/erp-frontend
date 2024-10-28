import Modal, { ModalContainer } from '@/components/modal-v2'
import { useClientCompany, useCreateClient } from '@/hooks/api/use-client'
import { Form, FormField, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { delay } from '@/utils/delay'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import SelectV1 from '@/components/common/select/select-v1'
import { CommandItem } from '@/components/ui/command'
import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

const clientSchema = z.object({
  name: z.string(),
  position: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  companyId: z.string().optional(),
  photo: z.instanceof(File).optional().nullable(),
})
type Client = z.infer<typeof clientSchema>

type ModalProps = {
  open: boolean
  setOpen: (val: boolean) => void
}
export default function DialogAddClient({ open, setOpen }: ModalProps) {
  useFixPointerEvent(open)

  // START OF HANDLE SELECT COMPANY
  const qCompany = useClientCompany()
  const [selectOpen, setSelectOpen] = useState(false)
  console.log(qCompany.data?.data?.data)
  // END OF HANDLE SELECT COMPANY

  // HANDLE FORM
  const { mutate } = useCreateClient()

  const form = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      position: '',
      phone: '',
      email: '',
      companyId: '',
    },
  })

  const onSubmit = async (data: any) => {
    mutate(data, {
      onSuccess: () => {
        delay(400).then(() => setOpen(false))
      },
    })
  }

  useEffect(() => {
    if (!open) form.reset()
  }, [open])
  // HANDLE FORM

  return (
    <>
      <Modal open={open} setOpen={setOpen} title='Buat user baru'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-4 px-1 pb-8 md:pb-0'
          >
            <ModalContainer setOpen={setOpen}>
              <FormField
                control={form.control}
                name='name'
                label='Nama'
                render={({ field }) => <Input {...field} />}
              />
              <FormField
                control={form.control}
                name='position'
                label='Jabatan'
                render={({ field }) => <Input {...field} />}
              />
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='phone'
                  label='Kontak'
                  render={({ field }) => <Input {...field} />}
                />
                <FormField
                  control={form.control}
                  name='email'
                  label='Email'
                  render={({ field }) => <Input {...field} />}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <FormLabel>Perusahaan</FormLabel>
                <SelectV1
                  open={selectOpen}
                  setOpen={setSelectOpen}
                  name='companyId'
                  placeholder='Pilih perusahaan'
                  side='bottom'
                  preview={(val) => (
                    <Button
                      size='sm'
                      variant='outline'
                      className={cn('w-full justify-start')}
                      type='button'
                    >
                      {
                        qCompany?.data?.data.data?.find(
                          (s: any) => s.id === Number(val)
                        )?.name
                      }
                    </Button>
                  )}
                >
                  {qCompany?.data?.data.data?.map((item: any) => (
                    <CommandItem
                      key={item.id}
                      value={item.id.toString()}
                      onSelect={(value) => {
                        form.setValue('companyId', value)
                        setSelectOpen(false)
                      }}
                    >
                      <span>{item.name}</span>
                    </CommandItem>
                  ))}
                </SelectV1>
                <p className='text-sm text-dark/50'>
                  perusahaan tempat user bekerja jika ada
                </p>
              </div>
            </ModalContainer>
          </form>
        </Form>
      </Modal>
    </>
  )
}

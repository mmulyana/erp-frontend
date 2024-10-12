import UploadProfile from '@/components/common/upload-profile'
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

const clientSchema = z.object({
  name: z.string(),
  position: z.string().optional(),
  contact: z.string().optional(),
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
  const [preview, setPreview] = useState<string | null>(null)

  // HANDLE SELECT COMPANY
  const qCompany = useClientCompany()
  const [selectOpen, setSelectOpen] = useState(false)
  // HANDLE SELECT COMPANY

  // HANDLE FORM
  const { mutate } = useCreateClient()

  const form = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      position: '',
      contact: '',
      email: '',
      companyId: '',
      photo: null,
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
              <UploadProfile
                name='photo'
                preview={preview}
                setPreview={setPreview}
              />
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
                  name='contact'
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
              <div className='space-y-2'>
                <FormLabel>Perusahaan</FormLabel>
                <SelectV1
                  open={selectOpen}
                  setOpen={setSelectOpen}
                  name='companyId'
                  placeholder='Pilih perusahaan'
                  side='bottom'
                  preview={(val) => (
                    <span>
                      {
                        qCompany?.data?.data.data.find(
                          (s: any) => s.id === Number(val)
                        )?.name
                      }
                    </span>
                  )}
                >
                  {qCompany?.data?.data.data.map((item: any) => (
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

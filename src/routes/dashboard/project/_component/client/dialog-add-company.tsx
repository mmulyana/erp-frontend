import UploadProfile from '@/components/common/upload-profile'
import Modal, { ModalContainer } from '@/components/modal-v2'
import { useCreateClientCompany } from '@/hooks/api/use-client'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { delay } from '@/utils/delay'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import { CreateClientCompany } from '@/utils/types/form'

const companySchema = z.object({
  name: z.string(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  photo: z.instanceof(File).optional().nullable(),
})

type ModalProps = {
  open: boolean
  setOpen: (val: boolean) => void
}
export default function DialogAddCompany({ open, setOpen }: ModalProps) {
  const [preview, setPreview] = useState<string | null>(null)

  // HANDLE FORM
  const { mutate } = useCreateClientCompany()

  const form = useForm<CreateClientCompany>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      photo: null,
    },
  })

  const onSubmit = async (data: CreateClientCompany) => {
    mutate(data, {
      onSuccess: () => {
        setPreview(null)
        delay(400).then(() => setOpen(false))
      },
    })
  }

  useEffect(() => {
    if (!open) {
      form.reset()
      setPreview(null)
    }
  }, [open])
  // HANDLE FORM

  return (
    <>
      <Modal open={open} setOpen={setOpen} title='Buat perusahaan baru'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-4 px-1 pb-0'
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
                label='Nama perusahaan'
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
              <FormField
                control={form.control}
                name='address'
                label='Alamat'
                render={({ field }) => <Textarea {...field} />}
              />
            </ModalContainer>
          </form>
        </Form>
      </Modal>
    </>
  )
}

import UploadProfile from '@/components/common/upload-profile'
import Modal, { ModalContainer } from '@/components/modal-v2'
import { CreateClientCompany } from '@/utils/types/form'
import { Form, FormField } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { BASE_URL } from '@/utils/constant/_urls'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  useCreateClientCompany,
  useDetailClientCompany,
  useUpdateClientCompany,
} from '@/hooks/api/use-client'
import { useApiData } from '@/shared/hooks/use-api-data'

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
  selectedId?: number | null
}
export default function DialogAddCompany({
  open,
  setOpen,
  selectedId: id,
}: ModalProps) {
  const [preview, setPreview] = useState<string | null>(null)

  // HANDLE DETAIL COMPANY FOR EDIT
  const { data, isLoading } = useApiData(
    useDetailClientCompany({
      enabled: open && !!id,
      id,
    })
  )

  // HANDLE FORM
  const { mutate: add } = useCreateClientCompany()
  const { mutate: update } = useUpdateClientCompany()

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
    if (id) {
      update(
        { id, payload: data },
        {
          onSuccess: () => {
            setPreview(null)
            form.reset()
            setOpen(false)
          },
        }
      )
      return
    }

    add(data, {
      onSuccess: () => {
        setPreview(null)
        form.reset()
        setOpen(false)
      },
    })
  }

  useEffect(() => {
    if (data && !isLoading && open) {
      const { logo, name, address, email, phone } = data

      form.reset({
        address: address ?? '',
        email: email ?? '',
        name: name ?? '',
        phone: phone ? String(phone) : '',
      })

      if (logo) {
        setPreview(BASE_URL + '/img/' + logo)
      }
    }
  }, [isLoading, data, open])

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
            className='w-full flex flex-col gap-4 px-1'
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

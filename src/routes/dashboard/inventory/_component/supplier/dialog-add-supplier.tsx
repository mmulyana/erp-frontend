import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import { useSupplierLabels } from '@/hooks/api/use-supplier-label'
import { useCreateSupplier } from '@/hooks/api/use-supplier'
import { useApiData } from '@/hooks/use-api-data'

import MultiSelect from '@/components/common/select/multi-select-v1'
import UploadProfile from '@/components/common/upload-profile'
import Modal, { ModalContainer } from '@/components/modal-v2'
import { Form, FormField } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}
export default function DialogAddSupplier({ open, setOpen }: Props) {
  useFixPointerEvent(open)

  const [preview, setPreview] = useState<null | string>(null)

  //  GET DATA TAG
  const { data: labels } = useApiData(useSupplierLabels())

  // START OF HANDLE FORM
  const { mutate } = useCreateSupplier()
  const form = useForm({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      email: '',
      tags: [] as string[],
      photo: null as File | null,
    },
  })
  const handleTags = (ids: string[]) => {
    form.setValue('tags', [...ids])
  }

  const onSubmit = (data: any) => {
    mutate(
      { payload: data },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      }
    )
  }
  return (
    <Modal title='Supplier baru' open={open} setOpen={setOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ModalContainer setOpen={setOpen}>
            <div className='space-y-4'>
              <UploadProfile
                name='photo'
                preview={preview}
                setPreview={setPreview}
              />

              <FormField
                label='Nama'
                control={form.control}
                name='name'
                render={({ field }) => <Input {...field} />}
              />
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  label='No. Telp'
                  control={form.control}
                  name='phone'
                  render={({ field }) => <Input {...field} />}
                />
                <FormField
                  label='Email'
                  control={form.control}
                  name='email'
                  render={({ field }) => <Input {...field} />}
                />
              </div>
              <FormField
                label='Alamat'
                control={form.control}
                name='address'
                render={({ field }) => <Textarea {...field} />}
              />
              <MultiSelect
                options={labels?.map((item) => ({
                  label: item.name,
                  value: String(item.id),
                })) || []}
                onChange={handleTags}
              />
            </div>
          </ModalContainer>
        </form>
      </Form>
    </Modal>
  )
}

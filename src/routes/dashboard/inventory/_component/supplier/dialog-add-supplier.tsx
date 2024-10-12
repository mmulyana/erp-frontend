import MultiSelect from '@/components/common/select/multi-select-v1'
import UploadProfile from '@/components/common/upload-profile'
import Modal, { ModalContainer } from '@/components/modal-v2'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateSupplier } from '@/hooks/api/use-supplier'
import { useTag } from '@/hooks/api/use-tag'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}
export default function DialogAddSupplier({ open, setOpen }: Props) {
  const [preview, setPreview] = useState<null | string>(null)

  //  GET DATA TAG
  const queryTag = useTag()
  const tags = useMemo(
    () =>
      queryTag?.data?.data?.data?.map((item: any) => ({
        ...item,
        label: item.name,
        value: item.id,
      })) || [],
    [queryTag.isLoading]
  )

  // START OF HANDLE FORM
  const { mutate } = useCreateSupplier()
  const form = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
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
      <ModalContainer setOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='p-4 space-y-4'>
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
              <FormField
                label='No. Telp'
                control={form.control}
                name='phone'
                render={({ field }) => <Input {...field} />}
              />
              <FormField
                label='Alamat'
                control={form.control}
                name='address'
                render={({ field }) => <Textarea {...field} />}
              />
              <MultiSelect options={tags} onChange={handleTags} />
            </div>
          </form>
        </Form>
      </ModalContainer>
    </Modal>
  )
}

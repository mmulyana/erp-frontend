import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import {
  useCreateRole,
  useDetailRole,
  useUpdateRole,
} from '@/hooks/api/use-role'
import { createRoleSchema } from '@/utils/schema/role'
import { useApiData } from '@/hooks/use-api-data'
import { CreateRole } from '@/utils/types/form'

import Modal, { ModalContainer } from '@/components/modal-v2'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
}
export default function AddRole({ open, setOpen, id }: Props) {
  const { mutate: create } = useCreateRole()
  const { mutate: update } = useUpdateRole()

  const { data: detail, isLoading } = useApiData(
    useDetailRole({ id, enabled: open && !!id })
  )

  const form = useForm<CreateRole>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const submit = (payload: CreateRole) => {
    if (id) {
      update(
        { id, payload },
        {
          onSuccess: () => {
            form.reset()
            setOpen(false)
          },
        }
      )
      return
    }
    create(payload, {
      onSuccess: () => {
        form.reset()
        setOpen(false)
      },
    })
  }

  useEffect(() => {
    if (open && !!id && detail && !isLoading) {
      form.reset({
        name: detail.name,
        description: detail.description,
      })
    }
  }, [open, id, detail, isLoading])

  useEffect(() => {
    if (!open) form.reset()
  }, [open])

  return (
    <Modal open={open} setOpen={setOpen} title='Buat user baru'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <ModalContainer setOpen={setOpen}>
            <FormField
              control={form.control}
              name='name'
              label='Nama'
              render={({ field }) => <Input {...field} />}
            />
            <FormField
              control={form.control}
              name='description'
              label='Deskripsi'
              render={({ field }) => <Textarea {...field} />}
            />
          </ModalContainer>
        </form>
      </Form>
    </Modal>
  )
}

import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import {
  useCreateAccount,
  useDetailAccount,
  useUpdateAccount,
} from '@/hooks/api/use-account'
import { useApiData } from '@/hooks/use-api-data'

import { createAccountSchema } from '@/utils/schema/account'
import { createUser } from '@/utils/types/form'
import { KEYS } from '@/utils/constant/_keys'

import Modal, { ModalContainer } from '@/components/modal-v2'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type FormValues = Pick<createUser, 'name'> & {
  phoneNumber: string
  email: string
}

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
}
export default function AddUser({ open, setOpen, id }: Props) {
  const queryClient = useQueryClient()

  const { mutate: create } = useCreateAccount()
  const { mutate: update } = useUpdateAccount()

  const { data: detail, isLoading } = useApiData(
    useDetailAccount({ enabled: open && !!id, id })
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
    },
  })

  const submit = (payload: FormValues) => {
    if (id) {
      update(
        { id, payload },
        {
          onSuccess: () => {
            form.reset()
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: [KEYS.ACCOUNTS] })
          },
        }
      )
      return
    }
    create(
      {
        ...payload,
        email: payload.email !== '' ? payload.email : null,
        phoneNumber: payload.phoneNumber !== '' ? payload.phoneNumber : null,
      },
      {
        onSuccess: () => {
          form.reset()
          setOpen(false)
        },
      }
    )
  }

  useEffect(() => {
    if (open && detail && !!id && !isLoading) {
      form.reset({
        name: detail.name,
        email: detail.email ?? '',
        phoneNumber: detail.phoneNumber ?? '',
      })
    }
  }, [open, detail, id, isLoading])

  useEffect(() => {
    if (!open) form.reset({ name: '', email: '', phoneNumber: '' })
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
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='email'
                label='Email'
                render={({ field }) => <Input {...field} />}
              />
              <FormField
                control={form.control}
                name='phoneNumber'
                label='Nomor Telp'
                render={({ field }) => <Input {...field} />}
              />
            </div>
          </ModalContainer>
        </form>
      </Form>
    </Modal>
  )
}

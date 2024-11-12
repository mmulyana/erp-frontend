import Modal, { ModalContainer } from '@/components/modal-v2'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateAccount } from '@/hooks/api/use-account'
import { createAccountSchema } from '@/utils/schema/account'
import { createUser } from '@/utils/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = Pick<createUser, 'name'> & {
  phoneNumber: string
  email: string
}

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}
export default function AddUser({ open, setOpen }: Props) {
  const { mutate: create } = useCreateAccount()

  const form = useForm<FormValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
    },
  })

  const submit = (payload: FormValues) => {
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

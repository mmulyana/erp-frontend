import { userAtom } from '@/shared/store/auth'
import InputPassword from '@/components/common/input-password'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAtomValue } from 'jotai'
import { useForm } from 'react-hook-form'
import { UpdatePassword } from '@/features/user/types'
import { useUpdatePassword } from '@/features/user/api/use-update-password'

export default function MenuPassword() {
  const user = useAtomValue(userAtom)

  const { mutate } = useUpdatePassword()

  const form = useForm<UpdatePassword>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  })

  const submit = (payload: UpdatePassword) => {
    if (!user?.id) return
    mutate({ id: user.id, payload })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className='flex flex-col gap-6 max-w-sm p-6'>
          <InputPassword label='Password lama' name='oldPassword' />
          <InputPassword label='Password Baru' name='newPassword' />
          <Button className='w-fit'>Perbarui</Button>
        </div>
      </form>
    </Form>
  )
}

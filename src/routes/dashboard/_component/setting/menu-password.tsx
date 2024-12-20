import { userAtom } from '@/atom/auth'
import InputPassword from '@/components/common/input-password'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useUpdatePassword } from '@/hooks/api/use-account'
import { UpdatePasswordDto } from '@/utils/schema/account'
import { useAtomValue } from 'jotai'
import { useForm } from 'react-hook-form'

export default function MenuPassword() {
  const user = useAtomValue(userAtom)

  const { mutate } = useUpdatePassword()

  const form = useForm<UpdatePasswordDto>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  })

  const submit = (payload: UpdatePasswordDto) => {
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

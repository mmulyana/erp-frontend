import InputPassword from '@/components/common/input-password'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'

type Account = {
  old_password: ''
  new_password: ''
  confirm_password: ''
}

export default function MenuPassword() {
  const form = useForm<Account>({
    defaultValues: {},
  })
  return (
    <Form {...form}>
      <form>
        <div className='flex flex-col gap-6 max-w-sm p-6'>
          <InputPassword label='Password lama' name='old_password' />
          <InputPassword label='Password Baru' name='new_password' />
          <InputPassword label='Konfirmasi Password' name='confirm_password' />
          <Button className='w-fit'>Perbarui</Button>
        </div>
      </form>
    </Form>
  )
}

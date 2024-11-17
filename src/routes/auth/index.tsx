import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { isValidEmail } from '@/utils/is-email-valid'
import { useAuth } from '@/hooks/api/use-auth'

import InputPassword from '@/components/common/input-password'
import { Form, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Layout, Protected } from './component'

import bg from '/public/images/dave-hoefler-vHgAy9pOs9I-unsplash.jpg'
import Logo from '/public/logo2.svg'
import { LogIn } from 'lucide-react'

type Payload = {
  name?: string
  email?: string
  password: string
}

export const LoginSchema = z.object({
  name: z.string().min(1, { message: 'Masukkan nama atau email Anda' }),
  password: z.string().min(8, {
    message: 'Silakan masukkan kata sandi yang terdiri dari minimal 8 karakter',
  }),
})

export default function Login() {
  const { logIn } = useAuth()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      name: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const payload: Payload = {
      password: data.password,
    }

    if (isValidEmail(data.name)) {
      payload.email = data.name
    } else {
      payload.name = data.name
    }

    await logIn(payload)
  }

  return (
    <Protected>
      <Layout>
        <div className='flex flex-col gap-4'>
          <img src={Logo} alt='logo erp' className='w-12 h-12' />
          <div className='w-full md:w-[calc(100%-72px)] flex flex-col justify-center'>
            <p className='text-dark text-xl font-medium'>
              Selamat Datang Kembali
            </p>
            <p className='text-dark/50 text-sm'>
              Login dengan akun Anda untuk melanjutkan
            </p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-4 mt-6'
          >
            <FormField
              control={form.control}
              name='name'
              label='Nama'
              render={({ field }) => (
                <Input
                  placeholder='Name'
                  {...field}
                  autoComplete='none'
                  className='bg-white/50'
                />
              )}
            />
            <InputPassword
              label='Password'
              name='password'
              className='bg-white/50'
            />

            <Button
              type='submit'
              variant='default'
              className='mt-4 h-fit py-2.5 gap-2'
            >
              Masuk
              <LogIn size={20} />
            </Button>
          </form>
        </Form>
      </Layout>
      <img src={bg} className='fixed -z-10 w-screen h-[100vh] object-cover' />
    </Protected>
  )
}

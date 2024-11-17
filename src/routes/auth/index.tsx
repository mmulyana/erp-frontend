import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'

import { isValidEmail } from '@/utils/is-email-valid'
import { useAuth } from '@/hooks/api/use-auth'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Layout, Protected } from './component'
import { Eye, EyeOff } from 'lucide-react'
import Logo from '/public/erp-logo.svg'

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
  const [isPassword, setIsPassword] = useState(true)

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
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='w-14 h-14 rounded-full bg-brand-blue flex items-center justify-center'>
            <img src={Logo} alt='logo erp' />
          </div>
          <div className='w-full md:w-[calc(100%-72px)] flex flex-col justify-center'>
            <p className='text-[#2E2C2C] font-medium'>
              Masuk
            </p>
            <p className='text-[#2E2C2C]/60 text-sm'>
              Enter your credential to access application
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama atau Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Name' {...field} autoComplete='none' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        placeholder='password'
                        {...field}
                        autoComplete='none'
                        type={isPassword ? 'password' : 'text'}
                      />
                    </FormControl>
                    <Button
                      type='button'
                      variant='ghost'
                      className='h-7 w-7 p-0 rounded-xl absolute hover:bg-transparent -translate-y-1/2 top-1/2 right-2'
                      onClick={() => setIsPassword(!isPassword)}
                    >
                      {!isPassword ? (
                        <EyeOff className='w-5 h-5 text-gray-500' />
                      ) : (
                        <Eye className='w-5 h-5 text-gray-500' />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type='submit' variant='default' className='mt-4'>
              Sign In
            </Button>
          </form>
        </Form>
      </Layout>
    </Protected>
  )
}

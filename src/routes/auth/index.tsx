import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/api/use-auth'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useState } from 'react'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { isValidEmail } from '@/utils/is-email-valid'

import { AlertCircle, Eye, EyeOff, XIcon } from 'lucide-react'
import Logo from '/public/erp-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { PATH } from '@/utils/constant/_paths'
import { delay } from '@/utils/delay'
import { toast } from 'sonner'
import { Layout, Protected } from './component'

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
  const navigate = useNavigate()
  const [errorBanner, setErrorBanner] = useState('')
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

    const response = await logIn(payload)

    if (response?.message?.includes('Invalid')) {
      setErrorBanner('Email atau password salah')
      return
    } else {
      setErrorBanner('')
    }

    delay(500).then(() => {
      toast(response.message)
    })
    navigate(PATH.DASHBOARD_OVERVIEW)
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
              Sign in to your account
            </p>
            <p className='text-[#2E2C2C]/60 text-sm'>
              Enter your credential to access application
            </p>
          </div>
        </div>
        <div className='h-14 flex flex-col justify-center'>
          {errorBanner !== '' && (
            <Alert variant='destructive' className='py-2 h-fit bg-red-100'>
              <AlertCircle className='h-4 w-4 absolute !top-1/2 -translate-y-1/2' />
              <AlertTitle className='m-0 text-base leading-none font-normal'>
                {errorBanner}
                <XIcon
                  className='h-4 w-4 text-red-500 -translate-y-1/2 absolute top-1/2 right-2 cursor-pointer'
                  onClick={() => setErrorBanner('')}
                />
              </AlertTitle>
            </Alert>
          )}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-4'
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
            <div className='flex justify-end -mt-2'>
              <div className='flex items-center space-x-2'>
                <Link
                  to={PATH.FORGOT}
                  className='text-brand-blue underline underline-offset-2'
                >
                  Lupa password?
                </Link>
              </div>
            </div>
            <Button type='submit' variant='default' className='mt-2'>
              Sign In
            </Button>
          </form>
          <div className='text-center mt-3 mb-4'>
            <p className='text-common-neutral'>
              Belum punya akun?{' '}
              <Link
                to={PATH.REGISTER}
                className='text-brand-blue underline underline-offset-2'
              >
                Daftar
              </Link>
            </p>
          </div>
        </Form>
      </Layout>
    </Protected>
  )
}

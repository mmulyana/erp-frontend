import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
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
import { useEffect, useState } from 'react'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { useDebounce } from '@uidotdev/usehooks'
import { AlertCircle, CheckCircle, Eye, EyeOff, XIcon } from 'lucide-react'
import Logo from '/public/erp-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { PATH } from '@/utils/constant/_paths'
import fetchOptions from '@/utils/fetch-options'
import { URLS } from '@/utils/constant/_urls'
import { delay } from '@/utils/delay'
import { toast } from 'sonner'
import { Layout, Protected } from '../component'

type Payload = {
  name: string
  email: string
  password: string
  confirm_password: string
}

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: 'Masukkan nama Anda' }),
    email: z.string().email(),
    password: z
      .string()
      .min(
        8,
        'Silakan masukkan kata sandi yang terdiri dari minimal 8 karakter'
      ),
    confirmPassword: z
      .string()
      .min(
        6,
        'Silakan masukkan konfirmasi kata sandi yang terdiri dari minimal 8 karakter'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords tidak sama',
    path: ['confirmPassword'],
  })

type PayloadAvailability = {
  name?: string
  email?: string
}

export default function Register() {
  const { register } = useAuth()
  const [errorBanner, setErrorBanner] = useState('')
  const [isPassword, setIsPassword] = useState(false)
  const [isConfirmPassword, setIsConfirmPassword] = useState(false)
  const [isAvailable, setIsAvailable] = useState<Record<string, boolean>>({})
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const debouncedName = useDebounce(form.watch('name'), 2000)
  const debouncedEmail = useDebounce(form.watch('email'), 2000)

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const payload: Payload = {
      password: data.password,
      confirm_password: data.password,
      name: data.name,
      email: data.email,
    }

    const response = await register(payload)

    if (response?.message?.includes('user already')) {
      setErrorBanner('Email atau nama ini sudah terdaftar')
      return
    } else {
      setErrorBanner('')
    }

    delay(500).then(() => {
      toast(response.message)
    })
    navigate(PATH.LOGIN)
  }

  const checkIsAvailable = async (value: string, type: 'email' | 'name') => {
    if (!value) return

    let payload: PayloadAvailability
    let url: string
    if (type == 'email') {
      url = URLS.CHECK_EMAIL
      payload = {
        email: value,
      }
    } else {
      url = URLS.CHECK_NAME
      payload = {
        name: value,
      }
    }
    let options = new fetchOptions('POST', JSON.stringify(payload))
    const response = await fetch(url, options.data)
    const { data } = await response.json()

    if (type == 'email') {
      setIsAvailable((prev) => ({ ...prev, email: data?.isAvailable || false }))
      if (data?.isAvailable === false) {
        form.setError('email', {
          type: 'manual',
          message: 'Email tidak tersedia',
        })
      } else {
        form.clearErrors('email')
      }
    } else {
      setIsAvailable((prev) => ({ ...prev, name: data?.isAvailable || false }))
      if (data?.isAvailable === false) {
        form.setError('name', {
          type: 'manual',
          message: 'Nama tidak tersedia',
        })
      } else {
        form.clearErrors('name')
      }
    }
  }

  useEffect(() => {
    if (form.getValues('name') == '') return

    checkIsAvailable(form.getValues('name'), 'name')
  }, [debouncedName])

  useEffect(() => {
    if (form.getValues('email') == '') return

    checkIsAvailable(form.getValues('email'), 'email')
  }, [debouncedEmail])

  return (
    <Protected>
      <Layout>
        <div className='flex gap-4'>
          <div className='w-14 h-14 rounded-full bg-brand-blue flex items-center justify-center'>
            <img src={Logo} alt='logo erp' />
          </div>
          <div className='w-[calc(100%-72px)] flex flex-col justify-center'>
            <p className='text-[#2E2C2C] font-medium'>Sign Up</p>
            <p className='text-[#2E2C2C]/60 text-sm'>create new account</p>
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
                  <FormLabel>Nama</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input placeholder='Name' {...field} />
                    </FormControl>
                    {isAvailable?.name == true && (
                      <div className='h-7 w-7 p-0 rounded-xl absolute flex items-center justify-center -translate-y-1/2 top-1/2 right-2'>
                        <CheckCircle className='h-5 w-5 text-teal-500' />
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        placeholder='Email'
                        {...field}
                        autoComplete='none'
                      />
                    </FormControl>
                    {isAvailable?.email == true && (
                      <div className='h-7 w-7 p-0 rounded-xl absolute flex items-center justify-center -translate-y-1/2 top-1/2 right-2'>
                        <CheckCircle className='h-5 w-5 text-teal-500' />
                      </div>
                    )}
                  </div>
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
                        type={!isPassword ? 'password' : 'text'}
                      />
                    </FormControl>
                    <Button
                      type='button'
                      variant='ghost'
                      className='h-7 w-7 p-0 rounded-xl absolute hover:bg-transparent -translate-y-1/2 top-1/2 right-2'
                      onClick={() => setIsPassword(!isPassword)}
                    >
                      {isPassword ? (
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
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        placeholder='password'
                        {...field}
                        autoComplete='none'
                        type={!isConfirmPassword ? 'password' : 'text'}
                      />
                    </FormControl>
                    <Button
                      type='button'
                      variant='ghost'
                      className='h-7 w-7 p-0 rounded-xl absolute hover:bg-transparent -translate-y-1/2 top-1/2 right-2'
                      onClick={() => setIsConfirmPassword(!isConfirmPassword)}
                    >
                      {isConfirmPassword ? (
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
            <Button type='submit' variant='default' className='mt-2'>
              Sign Up
            </Button>
          </form>
          <div className='text-center mt-3 mb-4'>
            <p className='text-common-neutral'>
              Sudah punya akun?{' '}
              <Link
                to={PATH.LOGIN}
                className='text-brand-blue underline underline-offset-2'
              >
                Masuk
              </Link>
            </p>
          </div>
        </Form>
      </Layout>
    </Protected>
  )
}

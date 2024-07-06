import ResponsiveModal from '@/components/responsive-modal.tsx'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { userCreateSchema } from './schema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRoles } from '@/utils/api/use-roles'
import { useEffect, useMemo, useState } from 'react'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, XIcon } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Combobox } from '@/components/combobox'
import { useCreateAccount } from '@/utils/api/use-account'
import { delay } from '@/utils/delay'

const TEXT = {
  TITLE: 'New Account',
  BODY: 'Create new an account',
}

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}
export default function AddModal(props: Props) {
  const { data, isLoading } = useRoles()
  const { mutate } = useCreateAccount()

  const [errorBanner, setErrorBanner] = useState<string>('')
  const [isPending, setIsPending] = useState<boolean>(false)

  const form = useForm<z.infer<typeof userCreateSchema>>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const roles = useMemo(() => {
    if (isLoading) return []
    return data?.data?.data?.roles.map((role: { name: string; id: number }) => ({
      label: role.name,
      value: role.id.toString(),
    }))
  }, [data, isLoading])

  const setSelect = (value: string) => {
    form.setValue('rolesId', Number(value))
  }

  const onSubmit = async (data: z.infer<typeof userCreateSchema>) => {
    if (data.password == '') delete data.password

    mutate(data, {
      onError: (error: any) => {
        console.log(error)
        setErrorBanner(error.message)
      },
      onSuccess: () => {
        setIsPending(true)
        delay(400).then(() => {
          setIsPending(false)
        })

        delay(600).then(() => {
          props.setOpen(false)
        })
      },
    })
  }

  useEffect(() => {
    if (!props.open) form.reset()
  }, [props.open])

  return (
    <ResponsiveModal
      isOpen={props.open}
      setIsOpen={props.setOpen}
      title={TEXT.TITLE}
      body={TEXT.BODY}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-4 px-1'
        >
          <div>
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
                    <Input placeholder='Email' {...field} autoComplete='none' />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className='flex flex-col'>
            <FormLabel>Role</FormLabel>
            <Combobox
              data={roles || []}
              placeholder='Select role'
              setValue={setSelect}
              value={form.watch('rolesId')?.toString()}
            />
          </FormItem>

          <div className='md:flex md:justify-end grid grid-cols-2 px-0 gap-4'>
            <Button
              type='button'
              onClick={() => props.setOpen(false)}
              variant='outline'
              className='w-full block md:hidden'
            >
              Cancel
            </Button>
            <Button type='submit'>{isPending ? 'loading' : 'Create'}</Button>
          </div>
        </form>
      </Form>
    </ResponsiveModal>
  )
}

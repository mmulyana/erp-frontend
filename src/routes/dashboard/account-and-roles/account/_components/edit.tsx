import { useMediaQuery } from '@uidotdev/usehooks'
import { Button } from '@/components/ui/button'
import { AlertCircle, Pencil, XIcon } from 'lucide-react'
import { useAccount, useEditAccount } from '@/utils/api/use-account'
import { useForm } from 'react-hook-form'
import { userEditSchema } from './schema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { delay } from '@/utils/delay'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { useRoles } from '@/utils/api/use-roles'
import { Combobox } from '@/components/combobox'
import ResponsiveModal from '@/components/responsive-modal.tsx'

const text = {
  title: 'Edit Account',
  body: 'Edit the details of this account.',
}

type Props = {
  id?: number
}
export default function Edit(props: Props) {
  const { mutate } = useEditAccount()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isPending, setIsPending] = useState<boolean>(false)
  const [errorBanner, setErrorBanner] = useState<string>('')

  const form = useForm<z.infer<typeof userEditSchema>>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const setSelect = (value: string) => {
    form.setValue('rolesId', Number(value))
  }

  const { data, isLoading } = useAccount(props.id)
  const { data: dataRoles, isLoading: rolesIsLoading } = useRoles()

  const roles = useMemo(() => {
    if (rolesIsLoading) return []
    return dataRoles?.data.data.roles.map((role: { name: string; id: number }) => ({
      label: role.name,
      value: role.id.toString(),
    }))
  }, [dataRoles, rolesIsLoading])

  useEffect(() => {
    if (!isLoading) {
      form.setValue('name', data.name)
      form.setValue('email', data.email)
      form.setValue('rolesId', data.roles.id)
    }
  }, [isLoading, data])

  useEffect(() => {
    if (!isOpen) setErrorBanner('')
    return () => setErrorBanner('')
  }, [isOpen])

  const onSubmit = async (data: z.infer<typeof userEditSchema>) => {
    mutate(
      { payload: data, id: Number(props.id) },
      {
        onError: (error: any) => {
          setErrorBanner(error.message)
        },
        onSuccess: () => {
          setIsPending(true)
          delay(400).then(() => {
            setIsPending(false)
          })

          delay(600).then(() => {
            setIsOpen(false)
          })
        },
      }
    )
  }

  return (
    <>
      <Button
        variant='ghost'
        className='text-gray-400 hover:text-gray-800'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Pencil className='h-4 w-4' />
      </Button>
      <ResponsiveModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={text.title}
        body={text.body}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-4'
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
                      <Input
                        placeholder='Email'
                        {...field}
                        autoComplete='none'
                      />
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
                placeholder='Role'
                setValue={setSelect}
                value={form.watch('rolesId')?.toString()}
              />
            </FormItem>

            <div className='md:flex md:justify-end grid grid-cols-2 px-0 gap-4'>
              <Button
                type='button'
                onClick={() => setIsOpen(false)}
                variant='outline'
                className='w-full block md:hidden'
              >
                Cancel
              </Button>
              <Button type='submit'>
                {isPending ? 'loading' : 'Save changes'}
              </Button>
            </div>
          </form>
        </Form>
      </ResponsiveModal>
    </>
  )
}

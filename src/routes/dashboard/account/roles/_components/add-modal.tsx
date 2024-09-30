import ResponsiveModal from '@/components/modal-responsive'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateRoles } from '@/hooks/api/use-roles'
import { useEffect, useState } from 'react'
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
import { delay } from '@/utils/delay'
import { rolesCreateSchema } from './schema'
import { usePermissionsGroup } from '@/hooks/api/use-permission'
import { PermissionGroup } from '@/utils/types/permision-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const TEXT = {
  TITLE: 'New Role',
  BODY: 'Create new a Role',
}

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}
export default function AddModal(props: Props) {
  const { mutate } = useCreateRoles()
  const { data } = usePermissionsGroup()

  const [errorBanner, setErrorBanner] = useState<string>('')
  const [isPending, setIsPending] = useState<boolean>(false)

  const form = useForm<z.infer<typeof rolesCreateSchema>>({
    resolver: zodResolver(rolesCreateSchema),
    defaultValues: {
      name: '',
      permissionIds: [],
    },
  })

  const onSubmit = async (data: z.infer<typeof rolesCreateSchema>) => {
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
          className='w-full flex flex-col gap-4 px-1 pb-8 md:pb-16'
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
          <div className='flex flex-col gap-2'>
            <FormLabel>Perizinan</FormLabel>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-4'>
              {data?.data?.data?.groups?.map((group: PermissionGroup) => (
                <div key={group.id}>
                  <p className='text-sm mb-1.5 capitalize text-gray-800 font-semibold'>
                    {group.name}
                  </p>
                  <div className='flex flex-col gap-1'>
                    {group?.permissions?.map((permission) => (
                      <FormField
                        key={permission.id}
                        control={form.control}
                        name='permissionIds'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className='flex gap-2 items-center'>
                                <Checkbox
                                  id={permission.id + '-' + permission.name}
                                  checked={
                                    field?.value?.includes(permission.id) ||
                                    false
                                  }
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          permission.id,
                                        ])
                                      : field.onChange(
                                          field.value.filter(
                                            (value: number) =>
                                              value !== permission.id
                                          )
                                        )
                                  }}
                                />
                                <Label
                                  className='block cursor-pointer font-normal text-sm text-gray-600 pb-0.5 capitalize'
                                  htmlFor={
                                    permission.id + '-' + permission.name
                                  }
                                >
                                  {permission.name.replace('_', ' ')}
                                </Label>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='md:flex md:justify-end grid grid-cols-2 gap-4 absolute bottom-0 left-0 w-full px-4 bg-white border-t border-gray-200 p-2'>
            <Button
              type='button'
              onClick={() => props.setOpen(false)}
              variant='outline'
              className='w-full block md:hidden'
            >
              Batal
            </Button>
            <Button type='submit'>{isPending ? 'loading' : 'Buat'}</Button>
          </div>
        </form>
      </Form>
    </ResponsiveModal>
  )
}

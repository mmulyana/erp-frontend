import { Button } from '@/components/ui/button'
import { AlertCircle, Pencil, XIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { rolesCreateSchema } from './schema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
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
import { useRole, useUpdateRoles } from '@/hooks/use-roles'
import ResponsiveModal from '@/components/modal-responsive'
import { usePermissionsGroup } from '@/hooks/use-permission'
import { PermissionGroup } from '@/utils/types/permision-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const text = {
  title: 'Edit Account',
  body: 'Edit the details of this account.',
}

type Props = {
  id?: number
}
export default function Edit(props: Props) {
  const { mutate } = useUpdateRoles()

  const { data, isLoading } = useRole(props.id)
  const { data: groups } = usePermissionsGroup()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isPending, setIsPending] = useState<boolean>(false)
  const [errorBanner, setErrorBanner] = useState<string>('')

  const form = useForm<z.infer<typeof rolesCreateSchema>>({
    resolver: zodResolver(rolesCreateSchema),
    defaultValues: {
      name: '',
      permissionIds: [],
    },
  })

  useEffect(() => {
    if (!isLoading) {
      form.setValue('name', data?.data.data.role.name)
      const ids = data?.data.data.role.permissionIds.map(
        (permission: number) => permission
      )
      form.setValue('permissionIds', ids)
    }
  }, [isLoading, data])

  useEffect(() => {
    if (!isOpen) setErrorBanner('')
    return () => setErrorBanner('')
  }, [isOpen])

  const onSubmit = async (data: z.infer<typeof rolesCreateSchema>) => {
    if (!props.id) return
    
    const payload = {
      name: data.name,
      id: props.id,
      permissionIds: data.permissionIds,
    }

    mutate(payload, {
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
    })
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

            <div className='flex flex-col gap-2'>
              <FormLabel>Perizinan</FormLabel>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-4'>
                {groups?.data?.data?.groups?.map((group: PermissionGroup) => (
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
                                            permission,
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

import ResponsiveModal from '@/components/responsive-modal.tsx'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateRoles } from '@/utils/api/use-roles'
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
import { usePermissionGroup } from '@/utils/api/use-permission'
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
  const { data } = usePermissionGroup()

  const [errorBanner, setErrorBanner] = useState<string>('')
  const [isPending, setIsPending] = useState<boolean>(false)

  const form = useForm<z.infer<typeof rolesCreateSchema>>({
    resolver: zodResolver(rolesCreateSchema),
    defaultValues: {
      name: '',
      permissionNames: [],
    },
  })

  const onSubmit = async (data: z.infer<typeof rolesCreateSchema>) => {
    console.log(data)
    // mutate(data, {
    //   onError: (error: any) => {
    //     console.log(error)
    //     setErrorBanner(error.message)
    //   },
    //   onSuccess: () => {
    //     setIsPending(true)
    //     delay(400).then(() => {
    //       setIsPending(false)
    //     })

    //     delay(600).then(() => {
    //       props.setOpen(false)
    //     })
    //   },
    // })
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

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {data?.data?.data?.groups?.map((group: PermissionGroup) => (
              <div key={group.id}>
                <p>{group.name}</p>
                {group?.permissions?.map((permission) => (
                  <FormField
                    key={permission.id}
                    control={form.control}
                    name='permissionNames'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            id={permission.id + '-' + permission.name}
                            checked={
                              field?.value?.includes(permission.name) || false
                            }
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    permission.name,
                                  ])
                                : field.onChange(
                                    field.value.filter(
                                      (value: string) =>
                                        value !== permission.name
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <Label htmlFor={permission.id + '-' + permission.name}>
                          {permission.name.replace('_', ' ')}
                        </Label>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            ))}
          </div>

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

import {
  usePermissionGroup,
  useUpdatePermissionGroup,
} from '@/utils/api/use-permission'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { permissionUpdateSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import ResponsiveModal from '@/components/responsive-modal.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const TEXT = {
  TITLE: 'Edit Permission',
  BODY: 'Edit the details of this permission.',
}

type Props = {
  id?: number
  open: boolean
  setOpen: (val: boolean) => void
}
export default function EditModal(props: Props) {
  //   const { mutate, isPending } = useUpdatePermissionGroup()
  const { data, isLoading } = usePermissionGroup(props.id)

  const form = useForm<z.infer<typeof permissionUpdateSchema>>({
    resolver: zodResolver(permissionUpdateSchema),
    defaultValues: {
      name: '',
      description: '',
      newPermissionNames: [],
      permissionNames: [],
    },
  })

  useEffect(() => {
    if (props.open && !!props.id && !isLoading) {
        const { name, description, permissions } = data?.data?.data.group[0]
        form.setValue('name', name)
        form.setValue('description', description)
        form.setValue('permissionNames', permissions)
    }
  }, [isLoading, data, props.open, props.id])

  const onSubmit = async (data: z.infer<typeof permissionUpdateSchema>) => {
    console.log(data)
  }

  return (
    <>
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
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder='Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Deskripsi' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </ResponsiveModal>
    </>
  )
}

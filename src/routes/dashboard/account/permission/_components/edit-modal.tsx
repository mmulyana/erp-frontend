import {
  usePermissionGroup,
  useUpdatePermissionGroup,
} from '@/hooks/use-permission'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { permissionUpdateSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import ResponsiveModal from '@/components/modal-responsive'
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
import { Button } from '@/components/ui/button'
import DeleteModalPermission from './delete-modal-permission'
import { toast } from 'sonner'

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
  const { mutate, isPending } = useUpdatePermissionGroup()
  const { data, isLoading } = usePermissionGroup(props.id)
  const [isOpen, setIsOpen] = useState(false)
  const [id, setId] = useState<number | undefined>(undefined)

  const form = useForm<z.infer<typeof permissionUpdateSchema>>({
    resolver: zodResolver(permissionUpdateSchema),
    defaultValues: {
      name: '',
      description: '',
      newPermissionNames: [],
      permissionNames: [],
    },
  })

  const { fields } = useFieldArray({
    name: 'permissionNames',
    control: form.control,
  })

  const {
    fields: fieldsNew,
    append: appendNew,
    remove: removeNew,
  } = useFieldArray({
    name: 'newPermissionNames',
    control: form.control,
  })

  useEffect(() => {
    if (props.open && !!props.id && !isLoading) {
      const { name, description, permissions } = data?.data?.data.group[0]
      const newPermissions = permissions.map(
        (permission: Record<string, number | string>) => ({
          id: permission.id,
          name: permission.name.toString().replace('_', ' '),
        })
      )
      form.setValue('name', name)
      form.setValue('description', description)
      form.setValue('permissionNames', newPermissions)
    }
  }, [isLoading, data, props.open, props.id])

  const onSubmit = async (data: z.infer<typeof permissionUpdateSchema>) => {
    if (!props.id) {
      toast('Silahkan update perizinan kembali')
      return
    }

    const payload = {
      id: props.id,
      ...data,
      newPermissionNames:
        data?.newPermissionNames
          ?.filter((permission) => permission.name !== '')
          .map((permission) => permission.name.replace(/[\s-]+/g, '_')) || [],
    } as any

    if (
      payload.hasOwnProperty('permissionNames') &&
      payload?.permissionNames.length === 0
    ) {
      delete payload.permissionNames
    }

    mutate(payload, {
      onSuccess: () => {
        toast('Perizinan berhasil diupdate')
        form.reset()
      },
      onError: (error) => {
        toast(error.message)
      },
    })
  }

  const handleDeletePermission = (field: any) => {
    const id = data?.data?.data.group[0].permissions.find(
      (d: any) => d.name === field.name.replace(/[\s-]+/g, '_')
    ).id
    setIsOpen(true)
    setId(id)
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

            <div>
              {fields.length > 0 && <FormLabel>Nama Perizinan</FormLabel>}
              {fields.map((field, index) => (
                <div key={field.id} className='message-item'>
                  <div className='grid grid-cols-[1fr_40px] gap-4 mt-2'>
                    <Input
                      {...form.register(`permissionNames.${index}.name`)}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => {
                        handleDeletePermission(field)
                      }}
                    >
                      <span className='text-xs'>Hapus</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              {fieldsNew.length > 0 && <FormLabel>Perizinan Baru</FormLabel>}

              {fieldsNew.map((field, index) => (
                <div key={field.id} className='message-item'>
                  <div className='grid grid-cols-[1fr_40px] gap-4 mt-2'>
                    <Input
                      {...form.register(`newPermissionNames.${index}.name`)}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => removeNew(index)}
                    >
                      <span className='text-xs'>Hapus</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Button
                type='button'
                variant='secondary'
                size='sm'
                onClick={() => appendNew({ name: '' })}
              >
                {fieldsNew.length > 0 ? 'Tambah' : 'Buat perizinan baru'}
              </Button>
            </div>

            <div className='flex flex-end w-full'>
              <Button
                type='submit'
                variant='default'
                className='block ml-auto'
                disabled={isPending}
              >
                {isPending ? 'loading' : 'Simpan'}
              </Button>
            </div>
          </form>
        </Form>
      </ResponsiveModal>

      <DeleteModalPermission
        open={isOpen}
        setOpen={setIsOpen}
        id={id}
        idGroup={props.id}
      />
    </>
  )
}

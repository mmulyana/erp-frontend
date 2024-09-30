import ResponsiveModal from '@/components/modal-responsive'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { permissionCreateSchema } from './schema'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useCreatePermissionGroup } from '@/hooks/api/use-permission'
import { createPGPayload } from '@/utils/api/fetcher/fetcher-permission'
import { delay } from '@/utils/delay'
import { toast } from 'sonner'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}

const TEXT = {
  TITLE: 'Tambah Izin',
  BODY: 'tambahkan perizinan baru pada aplikasi',
}

export default function AddModal(props: Props) {
  const form = useForm<z.infer<typeof permissionCreateSchema>>({
    resolver: zodResolver(permissionCreateSchema),
    defaultValues: {
      name: '',
      description: '',
      permissionNames: [{ name: '' }],
    },
  })

  const { mutate, isPending } = useCreatePermissionGroup()

  const { fields, append, remove } = useFieldArray({
    name: 'permissionNames',
    control: form.control,
  })

  const onSubmit = async (data: z.infer<typeof permissionCreateSchema>) => {
    const payload: createPGPayload = {
      name: data.name,
      description: data.description || '',
      permissionNames:
        data?.permissionNames
          ?.filter((permission) => permission.name !== '')
          .map((permission) => permission.name.replace(/[\s-]+/g, '_')) || [],
    }

    mutate(payload, {
      onError: (error: any) => {
        toast(error)
      },
      onSuccess: () => {
        delay(600).then(() => props.setOpen(false))
      },
    })
  }

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
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder='nama' {...field} />
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
                  <Textarea
                    placeholder='deskripsi'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {fields.map((field, index) => (
            <div key={field.id} className='message-item'>
              <FormLabel>Nama Perizinan {index + 1}</FormLabel>
              <div className='grid grid-cols-[1fr_40px] gap-4 mt-2'>
                <Input {...form.register(`permissionNames.${index}.name`)} />
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => remove(index)}
                >
                  <span className='text-xs'>Hapus</span>
                </Button>
              </div>
            </div>
          ))}
          <div>
            <Button
              type='button'
              variant='secondary'
              size='sm'
              onClick={() => append({ name: '' })}
            >
              Tambah
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
  )
}

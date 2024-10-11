import ResponsiveModal from '@/components/modal-responsive'
import { Button } from '@/components/ui/button'
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
import {
  useCreatePosition,
  useDetailPosition,
  useUpdatePosition,
} from '@/hooks/api/use-position'
import { delay } from '@/utils/delay'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const positionSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})
type Position = z.infer<typeof positionSchema>

type ModalProps = {
  id?: number
  open: boolean
  setOpen: (val: boolean) => void
}
export default function ModalAdd({ id, open, setOpen }: ModalProps) {
  const { mutate: create } = useCreatePosition()
  const { mutate: update } = useUpdatePosition()
  const { data, isLoading } = useDetailPosition(id)

  const form = useForm<Position>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const onSubmit = async (data: Position) => {
    if (!!id) {
      update(
        { ...data, id },
        {
          onSuccess: () => {
            delay(400).then(() => setOpen(false))
          },
        }
      )
      return
    }
    create(data, {
      onSuccess: () => {
        delay(400).then(() => setOpen(false))
      },
    })
  }

  useEffect(() => {
    if (!open) form.reset()
  }, [open])

  useEffect(() => {
    if (!id) return
    if (!isLoading && !!data?.data) {
      console.log(data?.data)
      form.setValue('name', data?.data?.data?.name)
      form.setValue('description', data?.data?.data?.description || '')
    }
  }, [id, isLoading, data])

  return (
    <>
      <ResponsiveModal
        isOpen={open}
        setIsOpen={setOpen}
        title={!!id ? 'Edit Posisi' : 'Posisi baru'}
        body={!!id ? 'Edit posisi ini' : 'Tambahkan posisi baru'}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-4 px-1 pb-8 md:pb-0'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder='Nama posisi' {...field} />
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
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end mt-4'>
              <Button type='submit'>Simpan</Button>
            </div>
          </form>
        </Form>
      </ResponsiveModal>
    </>
  )
}

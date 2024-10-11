import ResponsiveModal from '@/components/modal-responsive'
import Modal, { ModalContainer } from '@/components/modal-v2'
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
  id: number | null
  open: boolean
  setOpen: (val: boolean) => void
}
export default function ModalAdd({ id, open, setOpen }: ModalProps) {
  const { mutate: create } = useCreatePosition()
  const { mutate: update } = useUpdatePosition()
  const { data, isLoading } = useDetailPosition({
    id: id || undefined,
    enabled: !!id,
  })

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
      <Modal
        open={open}
        setOpen={setOpen}
        title={id ? 'Edit Posisi' : 'Posisi baru'}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-4 px-1 pb-8 md:pb-0'
          >
            <ModalContainer setOpen={setOpen}>
              <FormField
                control={form.control}
                name='name'
                label='Nama'
                render={({ field }) => (
                  <Input placeholder='Nama posisi' {...field} />
                )}
              />
              <FormField
                control={form.control}
                name='description'
                label='Deskripsi'
                render={({ field }) => <Textarea {...field} />}
              />
            </ModalContainer>
          </form>
        </Form>
      </Modal>
    </>
  )
}

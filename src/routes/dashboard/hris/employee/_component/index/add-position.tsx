import { RadioV2 } from '@/components/common/radio-v2'
import Modal, { ModalContainer } from '@/components/modal-v2'
import { Form, FormField, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  useCreatePosition,
  useDetailPosition,
  useUpdatePosition,
} from '@/hooks/api/use-position'
import { delay } from '@/utils/delay'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const positionSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  color: z.string().optional(),
})
type Position = z.infer<typeof positionSchema>

type ModalProps = {
  id: number | null
  open: boolean
  setOpen: (val: boolean) => void
}

const COLORS = [
  '#5463E8',
  '#2A9D90',
  '#E76E50',
  '#ED5757',
  '#5E81FF',
  '#8F49CC',
]

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
      color: '',
      description: '',
    },
  })

  const onSubmit = async (data: Position) => {
    if (!!id) {
      update(
        { ...data, id, color: data.color ?? COLORS[0] },
        {
          onSuccess: () => {
            delay(400).then(() => setOpen(false))
          },
        }
      )
      return
    }
    create(
      { ...data, color: data.color ?? COLORS[0] },
      {
        onSuccess: () => {
          delay(400).then(() => setOpen(false))
        },
      }
    )
  }

  useEffect(() => {
    if (!open) form.reset()
  }, [open])

  useEffect(() => {
    if (!id) return
    if (!isLoading && !!data?.data) {
      console.log(data?.data)
      form.setValue('name', data?.data?.data?.name as string)
      form.setValue('description', data?.data?.data?.description || '')
      form.setValue('color', data?.data?.data?.color || '')
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
            className='w-full flex flex-col gap-4 px-1'
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
              <Controller
                name='color'
                control={form.control}
                render={({ field }) => (
                  <div className='flex justify-between items-center'>
                    <FormLabel>Warna</FormLabel>
                    <div className='flex justify-between gap-4'>
                      {COLORS.map((color) => (
                        <RadioV2
                          {...field}
                          key={color}
                          value={color}
                          className='h-6 w-6 rounded-full flex items-center justify-center'
                          checked={field.value === color}
                          background={color}
                        >
                          {(checked) =>
                            checked && <Check className='w-4 h-4 text-white' />
                          }
                        </RadioV2>
                      ))}
                    </div>
                  </div>
                )}
              />
              <div className='flex justify-end'>
                <Controller
                  control={form.control}
                  name='color'
                  render={({ field }) => (
                    <input
                      type='color'
                      className='p-1 h-10 w-12 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700'
                      title='Choose your color'
                      {...field}
                    />
                  )}
                />
              </div>
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

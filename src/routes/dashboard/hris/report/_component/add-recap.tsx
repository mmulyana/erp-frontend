import Modal, { ModalContainer } from '@/components/modal-v2'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  useCreateRecap,
  useDetailRecap,
  useUpdateRecap,
} from '@/hooks/api/use-recap'
import { useApiData } from '@/shared/hooks/use-api-data'
import { createRecapSchema } from '@/utils/schema/recap'
import { CreateRecap } from '@/utils/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  id?: number | null
  open: boolean
  setOpen: (val: boolean) => void
}
export function AddRecap({ id, open, setOpen }: Props) {
  const { mutate: create } = useCreateRecap()
  const { mutate: update } = useUpdateRecap()

  const form = useForm<CreateRecap>({
    resolver: zodResolver(createRecapSchema),
    defaultValues: {
      start_date: undefined,
      end_date: undefined,
      name: '',
    },
  })

  const submit = (data: CreateRecap) => {
    if (id) {
      update(
        {
          id,
          payload: data,
        },
        {
          onSuccess: () => {
            form.reset()
            setOpen(false)
          },
        }
      )
      return
    }
    create(data, {
      onSuccess: () => {
        form.reset()
        setOpen(false)
      },
    })
  }

  const { data: detail, isLoading } = useApiData(
    useDetailRecap({ id, enabled: open && !!id })
  )

  useEffect(() => {
    if (detail && !isLoading && open && !!id) {
      form.reset({
        end_date: new Date(detail.start_date).toISOString().split('T')[0],
        start_date: new Date(detail.end_date).toISOString().split('T')[0],
        name: detail.name,
      })
    }
  }, [detail, isLoading])

  useEffect(() => {
    if (!open) {
      form.reset({
        name: '',
        start_date: undefined,
        end_date: undefined,
      })
    }
  }, [open])

  return (
    <Modal
      title={id ? 'Edit Periode' : 'Tambah Periode'}
      open={open}
      setOpen={setOpen}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <ModalContainer setOpen={setOpen}>
            <FormField
              control={form.control}
              name='name'
              label='Nama'
              render={({ field }) => <Input {...field} />}
            />
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='start_date'
                label='Tanggal mulai'
                render={({ field }) => (
                  <Input type='date' className='block' {...field} />
                )}
              />
              <FormField
                control={form.control}
                name='end_date'
                label='Tanggal akhir'
                render={({ field }) => (
                  <Input type='date' className='block' {...field} />
                )}
              />
            </div>
          </ModalContainer>
        </form>
      </Form>
    </Modal>
  )
}

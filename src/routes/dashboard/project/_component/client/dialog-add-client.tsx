import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import { Form, FormField, FormLabel } from '@/components/ui/form'
import Modal, { ModalContainer } from '@/components/modal-v2'
import SelectV1 from '@/components/common/select/select-v1'
import { CommandItem } from '@/components/ui/command'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { delay } from '@/utils/delay'
import { cn } from '@/utils/cn'
import { z } from 'zod'
import {
  useClientCompany,
  useCreateClient,
  useDetailClient,
  useUpdateClient,
} from '@/hooks/api/use-client'
import { useApiData } from '@/hooks/use-api-data'

const clientSchema = z.object({
  name: z.string(),
  position: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  companyId: z.string().optional().nullable(),
})
type Client = z.infer<typeof clientSchema>

type ModalProps = {
  open: boolean
  setOpen: (val: boolean) => void
  selectedId?: number | null
}
export default function DialogAddClient({
  open,
  setOpen,
  selectedId: id,
}: ModalProps) {
  useFixPointerEvent(open)

  // HANDLE GET DETAIL FOR EDIT
  const qClient = useDetailClient({
    id,
    enabled: open && !!id,
  })

  useEffect(() => {
    if (qClient?.data?.data.data && !qClient.isLoading && open) {
      const { name, position, phone, email, companyId } =
        qClient?.data.data?.data

      form.reset({
        companyId: companyId ? String(companyId) : null,
        email,
        name,
        phone,
        position,
      })
    }
  }, [qClient.isLoading, qClient.data, open])

  // START OF HANDLE SELECT COMPANY
  const { data: companies } = useApiData(useClientCompany())
  // END OF HANDLE SELECT COMPANY

  // HANDLE FORM
  const { mutate: add } = useCreateClient()
  const { mutate: update } = useUpdateClient()

  const form = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      position: '',
      phone: '',
      email: '',
      companyId: '',
    },
  })

  const onSubmit = async (data: Client) => {
    const payload = { ...data, companyId: Number(data.companyId) }
    if (id) {
      update(
        { id, payload },
        {
          onSuccess: () => {
            delay(400).then(() => setOpen(false))
          },
        }
      )
      return
    }
    add(payload, {
      onSuccess: () => {
        delay(400).then(() => setOpen(false))
      },
    })
  }

  useEffect(() => {
    if (!open) form.reset()
  }, [open])
  // HANDLE FORM

  return (
    <>
      <Modal open={open} setOpen={setOpen} title='Buat user baru'>
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
                render={({ field }) => <Input {...field} />}
              />
              <FormField
                control={form.control}
                name='position'
                label='Jabatan'
                render={({ field }) => <Input {...field} />}
              />
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='phone'
                  label='Kontak'
                  render={({ field }) => <Input {...field} />}
                />
                <FormField
                  control={form.control}
                  name='email'
                  label='Email'
                  render={({ field }) => <Input {...field} />}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <FormLabel>Perusahaan</FormLabel>
                <SelectV1
                  name='companyId'
                  placeholder='Pilih perusahaan'
                  side='bottom'
                  preview={(val) => (
                    <Button
                      size='sm'
                      variant='outline'
                      className={cn('w-full justify-start')}
                      type='button'
                    >
                      {companies?.find((s) => s.id === Number(val))?.name}
                    </Button>
                  )}
                >
                  {companies?.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.name.toString()}
                      onSelect={(value) => {
                        form.setValue('companyId', value)
                      }}
                    >
                      <span>{item.name}</span>
                    </CommandItem>
                  ))}
                </SelectV1>
                <p className='text-sm text-dark/50'>
                  perusahaan tempat user bekerja jika ada
                </p>
              </div>
            </ModalContainer>
          </form>
        </Form>
      </Modal>
    </>
  )
}

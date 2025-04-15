import { Form, FormField, FormLabel } from '@/components/ui/form'
import { useCreateAttachment } from '@/hooks/api/use-attachment'
import Modal, { ModalContainer } from '@/components/modal-v2'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { userAtom } from '@/shared/store/auth'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { z } from 'zod'
import { socket } from '@/shared/utils/socket'
import ProtectedComponent from '@/components/protected'
import { useQueryClient } from '@tanstack/react-query'
import { KEYS } from '@/shared/constants/_keys'

// type Form = Omit<createAttachment, 'file' | 'name'> & { file: File | null }
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]

const FormSchema = z.object({
  file: z
    .custom<File>()
    .refine((file) => file !== null, 'File is required')
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      'Only PDF, Word, or Excel files are allowed'
    ),
  isSecret: z.boolean(),
})

type FormValues = z.infer<typeof FormSchema>

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
  projectId?: number
  withSocket?: boolean
}
export default function AttachmentDialog({
  open,
  setOpen,
  id,
  projectId,
  withSocket,
}: Props) {
  const user = useAtomValue(userAtom)
  const queryClient = useQueryClient()

  const { mutate: upload } = useCreateAttachment()

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isSecret: false,
    },
  })

  const submit = async (data: FormValues) => {
    if (!data.file || !user || !projectId) return
    const name = data.file.name.split('.').slice(0, -1).join('.')
    const type = data.file.name.split('.').pop() || ''

    upload(
      {
        file: data.file,
        isSecret: data.isSecret,
        name,
        type,
        projectId,
        uploaded_by: user.id,
      },
      {
        onSuccess: () => {
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: [KEYS.PROJECT_DETAIL, projectId],
          })
          if (withSocket) socket.emit('request_board')
        },
      }
    )
  }

  useEffect(() => {
    if (!open) form.reset()
  }, [open])

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={id ? 'Ubah lampiran' : 'Tambah lampiran baru'}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <ModalContainer setOpen={setOpen}>
            <FormField
              control={form.control}
              name='file'
              render={({ field }) => (
                <Input
                  type='file'
                  className='file:absolute relative file:left-0 file:h-10 file:top-0 file:bg-line pl-28 file:border-0 file:px-3  file:text-dark text-gray-600 h-10 w-full rounded-xl border border-[#DEE0E3] shadow-none'
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0] || null)
                  }}
                />
              )}
            />
            <ProtectedComponent required={['project:read-secret-attachment']}>
              <FormField
                control={form.control}
                name='isSecret'
                render={({ field }) => (
                  <div className='flex items-center space-x-2 mt-2'>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id='secret'
                    />
                    <div className='space-y-1 leading-none'>
                      <FormLabel htmlFor='secret'>File rahasia</FormLabel>
                    </div>
                  </div>
                )}
              />
            </ProtectedComponent>
          </ModalContainer>
        </form>
      </Form>
    </Modal>
  )
}

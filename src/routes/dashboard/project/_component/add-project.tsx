import SelectV1 from '@/components/common/select/select-v1'
import Modal, { ModalContainer } from '@/components/modal-v2'
import { CommandItem } from '@/components/ui/command'
import { Form, FormField } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useProjectLabel } from '@/hooks/api/use-project-label'
import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import { BoxIcon, TagIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}
export default function AddProject({ open, setOpen }: Props) {
  useFixPointerEvent(open)
  const qLabs = useProjectLabel()

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      labelId: '',
    },
  })

  const submit = async (data: any) => {
    console.log(data)
  }

  const [openLabel, setOpenLabel] = useState(false)

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title='Proyek baru'
      icon={<BoxIcon className='w-4 h-4 text-dark' />}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <ModalContainer setOpen={setOpen}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <input
                  className='text-xl text-dark/80 px-0 border-none outline-none'
                  autoFocus
                  placeholder='Nama proyek'
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <Textarea
                  //   className='text-sm w-full py-0 rounded-none min-h-fit shadow-none text-dark/80 px-0 border-none outline-none'
                  className='w-full min-h-6 p-0 outline-none ring-0 rounded-none border-none shadow-none placeholder:text-dark/50'
                  placeholder='Tambah deskripsi pekerjaan'
                  {...field}
                />
              )}
            />

            <div className='flex gap-2 items-center'>
              <SelectV1
                open={openLabel}
                setOpen={setOpenLabel}
                classNameBtn='flex-1'
                name='labelId'
                customPlaceholder={
                  <div className='inline-flex gap-1 items-center border border-dashed border-line px-3 py-1.5 rounded'>
                    <TagIcon className='w-4 h-4' />
                    <span className='text-sm text-dark/50'>Pilih label</span>
                  </div>
                }
                preview={(val) => (
                  <div className='inline-flex gap-1 items-center border border-line px-3 py-1.5 rounded'>
                    <TagIcon className='w-4 h-4' />

                    <span className='text-sm text-dark'>
                      {
                        qLabs?.data?.data.data.find(
                          (s: any) => s.id === Number(val)
                        )?.name
                      }
                    </span>
                  </div>
                )}
              >
                {qLabs?.data?.data.data.map((item: any) => (
                  <CommandItem
                    key={item.id}
                    className='hover:bg-red-400'
                    value={item.id.toString()}
                    onSelect={(value) => {
                      form.setValue('labelId', value)
                      setOpenLabel(false)
                    }}
                  >
                    <span className='px-2 py-0.5 bg-blue-50 text-blue-600 cursor-pointer'>
                      {item.name}
                    </span>
                  </CommandItem>
                ))}
              </SelectV1>
            </div>
          </ModalContainer>
        </form>
      </Form>
    </Modal>
  )
}

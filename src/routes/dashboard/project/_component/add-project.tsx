import SelectV1 from '@/components/common/select/select-v1'
import Modal, { ModalContainer } from '@/components/modal-v2'
import { CommandItem } from '@/components/ui/command'
import { Form, FormField } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useClient } from '@/hooks/api/use-client'
import { useProjectLabel } from '@/hooks/api/use-project-label'
import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import { BoxIcon, TagIcon, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}
export default function AddProject({ open, setOpen }: Props) {
  useFixPointerEvent(open)
  const qLabs = useProjectLabel()
  const qUsers = useClient()

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      labelId: '',
      clientId: '',
      picId: '',
    },
  })

  const submit = async (data: any) => {
    console.log(data)
  }

  // HANDLE POPOVER
  type Dialog = { label: boolean; user: boolean; pic: boolean }
  const [dialog, setDialog] = useState<Dialog>({
    label: false,
    user: false,
    pic: false,
  })
  const handleDialog = (type: keyof Dialog, val?: boolean) => {
    setDialog((prev) => ({ ...prev, [type]: val || false }))
  }

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
                open={dialog.label}
                setOpen={(val) => handleDialog('label', val)}
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
                      handleDialog('label')
                    }}
                  >
                    <span className='px-2 py-0.5 bg-blue-50 text-blue-600 cursor-pointer'>
                      {item.name}
                    </span>
                  </CommandItem>
                ))}
              </SelectV1>
              <SelectV1
                open={dialog.user}
                setOpen={(val) => handleDialog('user', val)}
                classNameBtn='flex-1'
                name='clientId'
                customPlaceholder={
                  <div className='inline-flex gap-1 items-center border border-dashed border-line px-3 py-1.5 rounded'>
                    <UserIcon className='w-4 h-4' />
                    <span className='text-sm text-dark/50'>Pilih user</span>
                  </div>
                }
                preview={(val) => (
                  <div className='inline-flex gap-1 items-center border border-line px-3 py-1.5 rounded'>
                    <UserIcon className='w-4 h-4' />

                    <span className='text-sm text-dark'>
                      {
                        qUsers?.data?.data.data.find(
                          (s: any) => s.id === Number(val)
                        )?.name
                      }
                    </span>
                  </div>
                )}
              >
                {qUsers?.data?.data.data.map((item: any) => (
                  <CommandItem
                    key={item.id}
                    className='hover:bg-red-400'
                    value={item.id.toString()}
                    onSelect={(value) => {
                      form.setValue('clientId', value)
                      handleDialog('user')
                    }}
                  >
                    <span className='px-2 py-0.5 flex gap-1 items-center'>
                      <div className='w-5 h-5 rounded-full bg-blue-900 text-white text-sm flex items-center justify-center pb-0.5 uppercase'>
                        {item.name.at(0)}
                      </div>
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

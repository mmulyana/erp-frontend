import MultiSelect from '@/components/common/select/multi-select-v1'
import SelectV1 from '@/components/common/select/select-v1'
import Modal, { ModalContainer } from '@/components/modal-v2'
import { CommandItem } from '@/components/ui/command'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useBoards } from '@/hooks/api/use-board'
import { useClient } from '@/hooks/api/use-client'
import { useEmployees } from '@/hooks/api/use-employee'
import { useCreateProject } from '@/hooks/api/use-project'
import { useProjectLabel } from '@/hooks/api/use-project-label'
import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import { BoxIcon, UserIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}
export default function AddProject({ open, setOpen }: Props) {
  useFixPointerEvent(open)

  const { mutate } = useCreateProject()

  const qLabels = useProjectLabel()
  const qUsers = useClient()
  const qEmployees = useEmployees({ enabled: true })
  const qBoards = useBoards()
  const labels = useMemo(
    () =>
      qLabels?.data?.data?.data.map((item: any) => ({
        ...item,
        value: item.id,
        label: item.name,
      })) || [],
    [qLabels.data, qLabels.isLoading]
  )

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      labels: [] as number[],
      clientId: null as number | null,
      leadId: null as number | null,
      employees: [] as number[],
    },
  })
  const employees = useMemo(
    () =>
      qEmployees?.data?.data?.data.map((item: any) => ({
        ...item,
        value: item.id,
        label: item.fullname,
      })) || [],
    [qEmployees.data, qEmployees.isLoading]
  )

  const submit = async (data: any) => {
    mutate(
      {
        payload: { ...data, containerId: qBoards.data?.data.data[0].id },
      },
      {
        onSuccess: () => setOpen(false),
      }
    )
  }

  // HANDLE POPOVER
  type Dialog = { user: boolean; lead: boolean }
  const [dialog, setDialog] = useState<Dialog>({
    user: false,
    lead: false,
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
              name='name'
              render={({ field }) => (
                <Input
                  className='text-xl text-dark/80 px-0 border-none outline-none rounded-none shadow-none'
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
                  className='w-full min-h-6 p-0 outline-none ring-0 rounded-none border-none shadow-none placeholder:text-dark/50'
                  placeholder='Tambah deskripsi pekerjaan'
                  {...field}
                />
              )}
            />

            <div className='flex gap-2 items-center flex-wrap gap-y-4'>
              <SelectV1
                open={dialog.user}
                setOpen={(val) => handleDialog('user', val)}
                classNameBtn='flex-1'
                name='clientId'
                customPlaceholder={
                  <div className='inline-flex gap-1 items-center border border-dashed border-dark/40 hover:bg-line/50 px-3 py-1.5 rounded-full'>
                    <UserIcon className='w-4 h-4' />
                    <span className='text-sm text-dark/50'>Pilih user</span>
                  </div>
                }
                preview={(val) => (
                  <div className='inline-flex gap-1 items-center border border-dark/40 hover:bg-line/50 px-3 py-1.5 rounded-full'>
                    <UserIcon className='w-4 h-4' />

                    <span className='text-sm text-dark'>
                      {
                        qUsers?.data?.data.data.find((s: any) => s.id === val)
                          ?.name
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
                      form.setValue('clientId', Number(value))
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
              <SelectV1
                open={dialog.lead}
                setOpen={(val) => handleDialog('lead', val)}
                classNameBtn='flex-1'
                name='leadId'
                customPlaceholder={
                  <div className='inline-flex flex-1 gap-1 items-center border border-dashed border-dark/40 hover:bg-line/50 px-3 py-1.5 rounded-full'>
                    <UserIcon className='w-4 h-4' />
                    <span className='text-sm text-dark/50'>
                      Pilih Penanggung Jawab
                    </span>
                  </div>
                }
                preview={(val) => (
                  <div className='inline-flex flex-1 gap-1 items-center border border-dark/40 hover:bg-line/50 px-3 py-1.5 rounded-full'>
                    <UserIcon className='w-4 h-4' />

                    <span className='text-sm text-dark'>
                      {
                        qEmployees?.data?.data.data.find(
                          (s: any) => s.id === Number(val)
                        )?.fullname
                      }
                    </span>
                  </div>
                )}
              >
                {qEmployees?.data?.data.data.map((item: any) => (
                  <CommandItem
                    key={item.id}
                    className='hover:bg-red-400'
                    value={item.id.toString()}
                    onSelect={(value) => {
                      form.setValue('leadId', Number(value))
                      handleDialog('lead')
                    }}
                  >
                    <span className='px-2 py-0.5 flex gap-1 items-center'>
                      <div className='w-5 h-5 rounded-full bg-blue-900 text-white text-sm flex items-center justify-center pb-0.5 uppercase'>
                        {item.fullname.at(0)}
                      </div>
                      {item.fullname}
                    </span>
                  </CommandItem>
                ))}
              </SelectV1>
              <MultiSelect
                options={labels}
                label='Label'
                onChange={(val) =>
                  form.setValue(
                    'labels',
                    val.map((item) => Number(item))
                  )
                }
              />
              <MultiSelect
                options={employees}
                label='Pegawai'
                onChange={(val) =>
                  form.setValue(
                    'employees',
                    val.map((item) => Number(item))
                  )
                }
              />
            </div>
          </ModalContainer>
        </form>
      </Form>
    </Modal>
  )
}

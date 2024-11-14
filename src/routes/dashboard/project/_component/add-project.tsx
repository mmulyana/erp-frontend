import { useForm } from 'react-hook-form'

import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import { useProjectLabels } from '@/hooks/api/use-project-label'
import { useAllEmployees } from '@/hooks/api/use-employee'
import {
  useCreateProject,
  useCreateProjectSocket,
} from '@/hooks/api/use-project'
import { useBoards } from '@/hooks/api/use-board'
import { useClient } from '@/hooks/api/use-client'
import { useApiData } from '@/hooks/use-api-data'

import { EditorDescription } from '@/components/tiptap/editor-description'
import Modal, { ModalContainer } from '@/components/modal-v2'
import SelectV1 from '@/components/common/select/select-v1'
import { Form, FormField } from '@/components/ui/form'
import { CommandItem } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import Label from '@/components/common/label'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/common/multi-select'

import { BoxIcon, User, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { BASE_URL } from '@/utils/constant/_urls'
import { socket } from '@/utils/socket'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  withSocket?: boolean
}
export default function AddProject({ open, setOpen, withSocket }: Props) {
  useFixPointerEvent(open)

  const { mutate } = useCreateProject()
  const { createBySocket } = useCreateProjectSocket()

  const [leadName, setLeadName] = useState('')
  const { data: leads } = useApiData(
    useAllEmployees({ enabled: open, name: leadName })
  )

  const [employeeName, setEmployeeName] = useState('')
  const { data: employees } = useApiData(
    useAllEmployees({ enabled: open, name: employeeName })
  )
  const employeeOptions = employees?.map((item) => ({
    label: item.fullname,
    value: String(item.id),
  }))

  const { data: labels } = useApiData(useProjectLabels())
  const labelOptions = labels?.map((item) => ({
    label: item.name,
    value: String(item.id),
  }))

  const { data: clients } = useApiData(useClient())
  const { data: boards } = useApiData(useBoards())

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      labels: [] as string[],
      clientId: null as number | null,
      leadId: null as number | null,
      employees: [] as string[],
    },
  })

  let leadId = form.watch('leadId')

  const submit = async (data: any) => {
    if (!!withSocket) {
      return createBySocket({
        ...data,
        labels: data.labels.map((item: any) => Number(item)),
        employees: data.employees.map((item: any) => Number(item)),
        containerId: boards?.find((item) => item.name === 'penawaran')?.id,
      })
        .then(() => {
          setOpen(false)
          form.reset()
        })
        .finally(() => {
          socket.off('success_create_project')
          socket.off('error_create_project')
        })
    }
    mutate(
      {
        payload: {
          ...data,
          labels: data.labels.map((item: any) => Number(item)),
          employees: data.employees.map((item: any) => Number(item)),
          containerId: boards?.find((item) => item.name === 'penawaran')?.id,
        },
      },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      }
    )
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

            <div className='flex gap-2 items-center flex-wrap'>
              <SelectV1
                name='clientId'
                placeholder='Pilih klien'
                className='rounded-full w-fit gap-2'
                prefix={<User size={14} />}
                customPlaceholder={
                  <div className='inline-flex gap-1 items-center border border-dashed border-dark/40 hover:bg-line/50 px-3 py-1.5 rounded-full'>
                    <UserIcon className='w-4 h-4' />
                    <span className='text-sm text-dark/50'>Pilih klien</span>
                  </div>
                }
                preview={(val) => (
                  <span className='text-sm text-dark'>
                    {clients?.find((s: any) => s.id === val)?.name}
                  </span>
                )}
              >
                {clients?.map((item: any) => (
                  <CommandItem
                    key={item.id}
                    className='hover:bg-red-400'
                    value={item.id.toString()}
                    onSelect={(value) => {
                      form.setValue('clientId', Number(value))
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
                name='leadId'
                placeholder='Pilih Penanggung Jawab'
                className='rounded-full w-fit gap-2'
                onSearch={setLeadName}
                shouldFilter={false}
                prefix={<User size={14} />}
                customPlaceholder={
                  <div className='inline-flex gap-1 items-center border border-dashed border-dark/40 hover:bg-line/50 px-3 py-1.5 rounded-full'>
                    <UserIcon className='w-4 h-4' />
                    <span className='text-sm text-dark/50'>Pilih PJ</span>
                  </div>
                }
                preview={(val) => (
                  <span className='text-sm text-dark'>
                    {leads?.find((s: any) => s.id === val)?.fullname}
                  </span>
                )}
              >
                {leads?.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.fullname}
                    onSelect={() => {
                      form.setValue('leadId', item.id)
                    }}
                  >
                    <span className='py-0.5 flex gap-2 items-center'>
                      {item.photo ? (
                        <img
                          src={BASE_URL + '/img/' + item.photo}
                          className='w-6 h-6 rounded-full'
                        />
                      ) : (
                        <div className='w-6 h-6 rounded-full bg-blue-900 text-white text-sm flex items-center justify-center pb-0.5 uppercase'>
                          {item.fullname.at(0)}
                        </div>
                      )}
                      {item.fullname}
                    </span>
                  </CommandItem>
                ))}
              </SelectV1>
            </div>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <EditorDescription
                  content={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='labels'
                render={({ field }) => (
                  <MultiSelector
                    options={labelOptions || []}
                    values={field.value}
                    onValuesChange={field.onChange}
                    loop
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput placeholder='Pilih label' />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {labels?.map((item) => (
                          <MultiSelectorItem value={String(item.id)}>
                            <Label color={item.color} name={item.name} />
                          </MultiSelectorItem>
                        ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
                )}
              />
              <FormField
                control={form.control}
                name='employees'
                render={({ field }) => (
                  <MultiSelector
                    shouldFilter={false}
                    options={employeeOptions || []}
                    values={field.value}
                    onValuesChange={field.onChange}
                    onSearch={setEmployeeName}
                    loop
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput placeholder='Pilih Pegawai' />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {employees
                          ?.filter((item) => item.id !== Number(leadId))
                          .map((item) => (
                            <MultiSelectorItem value={String(item.id)}>
                              <span className='px-2 py-0.5 flex gap-1 items-center'>
                                <div className='w-5 h-5 rounded-full bg-blue-900 text-white text-sm flex items-center justify-center pb-0.5 uppercase'>
                                  {item.fullname.at(0)}
                                </div>
                                {item.fullname}
                              </span>
                            </MultiSelectorItem>
                          ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
                )}
              />
            </div>
          </ModalContainer>
        </form>
      </Form>
    </Modal>
  )
}

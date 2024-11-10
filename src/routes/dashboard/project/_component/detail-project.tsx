import { formatToRupiah } from '@/utils/formatCurrency'
import { useCallback, useMemo, useState } from 'react'
import { id as indonesia } from 'date-fns/locale'
import { format } from 'date-fns'
import { cn } from '@/utils/cn'

import {
  useProject,
  useUpdateProject,
  useUpdateStatusProject,
} from '@/hooks/api/use-project'
import { useApiData } from '@/hooks/use-api-data'
import { useBoards } from '@/hooks/api/use-board'

import { EditorDescription } from '@/components/tiptap/editor-description'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Editable } from '@/components/common/editable'
import { Tab, Tabs } from '@/components/tab'
import DataSheet from '@/components/common/data-sheet'
import Chips from '@/components/common/chips'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import AttachmentProject from './detail/attachment-project'
import BorrowedProject from './detail/borrowed-project'
import EmployeeProject from './detail/employee-project'
import ActivityProject from './detail/activity-project'
import EstimateProject from './detail/estimate-project'
import LabelProject from './detail/label-project'
import UserProject from './detail/user-project'
import LeadProject from './detail/lead-project'

import { Ellipsis } from 'lucide-react'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
}

export default function DetailProject({ open, setOpen, id }: Props) {
  const { mutate: update } = useUpdateProject()
  const { mutate: updateStatus } = useUpdateStatusProject()

  const [content, setContent] = useState('')

  const { data: project } = useApiData(useProject(id))
  const { data: boards } = useApiData(useBoards())

  const [edit, setEdit] = useState<string | null>('')
  const isEdit = useMemo(() => edit, [edit])
  const onEdit = useCallback(
    (val: string | null) => {
      setEdit(val)
    },
    [edit]
  )

  if (!id) return null

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className='w-full p-0'>
        <div className='h-12 w-full flex gap-2 items-center border-b border-line px-4'>
          <p className='text-sm text-dark'>Detail Proyek</p>
        </div>
        <ScrollArea className='h-[calc(100vh-48px)]'>
          <div className='px-4 pt-4 mb-8'>
            <div className='space-y-2'>
              <div className='flex justify-between items-center relative'>
                <Editable
                  isEdit={isEdit}
                  onEdit={onEdit}
                  keyData='name'
                  defaultData={project?.name}
                  className='text-xl font-medium text-dark'
                  onUpdate={(val) => {
                    update({ id, payload: { name: val as string } })
                  }}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='outline'
                      className='absolute flex justify-center items-center top-1/2 -translate-y-1/2 right-0 w-6 h-6 p-0'
                    >
                      <Ellipsis size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='min-w-fit -translate-x-4'>
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => {
                          update({
                            id,
                            payload: { isArchive: !project?.isArchive },
                          })
                        }}
                      >
                        {project?.isArchive ? 'Batal' : 'Arsipkan'}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          update({ id, payload: { isDeleted: true } })
                        }}
                      >
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Editable
                isEdit={isEdit}
                onEdit={onEdit}
                keyData='description'
                classNameInput='w-full'
                defaultData={project?.description}
                type='custom'
                customEdit={
                  <div>
                    <EditorDescription
                      content={project?.description}
                      onChange={setContent}
                    />
                    <div className='flex justify-end gap-2 mt-2'>
                      <Button variant='secondary' onClick={() => onEdit(null)}>
                        Batal
                      </Button>
                      <Button
                        variant='default'
                        onClick={() => {
                          update(
                            { id, payload: { description: content } },
                            { onSuccess: () => onEdit(null) }
                          )
                        }}
                      >
                        Simpan
                      </Button>
                    </div>
                  </div>
                }
                customData={(val) => (
                  <div className='px-6 border rounded border-line w-full'>
                    <div
                      className='w-full py-2'
                      dangerouslySetInnerHTML={{ __html: val }}
                    />
                  </div>
                )}
                className='text-dark/50'
                onUpdate={(val) => {
                  update({ id, payload: { description: val as string } })
                }}
              />
            </div>
            <div className='flex mt-4 flex-col gap-4'>
              <DataSheet>
                <p className='text-dark/50'>Status</p>
                <Editable
                  isEdit={isEdit}
                  onEdit={onEdit}
                  keyData='status'
                  type='select'
                  options={boards?.map((item) => ({
                    name: item.name,
                    value: item.id,
                  }))}
                  defaultData={project?.boardItems.container.id}
                  customData={(val) => {
                    const index = boards?.findIndex((item) => item.id === val)

                    if (!!boards?.length) {
                      return (
                        <Chips
                          background={boards[index || 0]?.color || ''}
                          text={boards[index || 0]?.name || ''}
                        />
                      )
                    }
                  }}
                  onUpdate={(val) => {
                    updateStatus({ id, containerId: val as string })
                  }}
                />
              </DataSheet>
              <DataSheet
                className={cn(
                  project?.labels && project?.labels.length > 2 && 'items-start'
                )}
              >
                <p className='text-dark/50'>Label</p>
                <LabelProject
                  id={id}
                  data={{ labels: project?.labels || [] }}
                />
              </DataSheet>
              <DataSheet>
                <p className='text-dark/50'>User</p>
                <UserProject id={id} data={{ client: project?.client }} />
              </DataSheet>
              <DataSheet>
                <p className='text-dark/50'>Penanggung Jawab</p>
                <LeadProject id={id} data={{ lead: project?.lead }} />
              </DataSheet>
              <DataSheet>
                <p className='text-dark/50'>Progress</p>
                <Editable
                  isEdit={isEdit}
                  onEdit={onEdit}
                  keyData='progress'
                  defaultData={project?.progress}
                  customData={(val) => <p>{val} %</p>}
                  onUpdate={(val) => {
                    update({ id, payload: { progress: Number(val) } })
                  }}
                />
              </DataSheet>
            </div>
          </div>
          <Tabs>
            <Tab label='Info'>
              <div className='px-4 pb-10 pt-4 bg-[#FBFBFB] min-h-[calc(100vh-400px)]'>
                <div className='flex flex-col gap-4'>
                  <DataSheet>
                    <p className='text-dark/50'>Nilai Proyek</p>
                    <Editable
                      isEdit={isEdit}
                      onEdit={onEdit}
                      keyData='net_value'
                      defaultData={project?.net_value}
                      customData={(val) => (
                        <p>{formatToRupiah(val as number)}</p>
                      )}
                      onUpdate={(val) => {
                        update({ id, payload: { net_value: Number(val) } })
                      }}
                    />
                  </DataSheet>
                  <DataSheet>
                    <p className='text-dark/50'>Status Pembayaran</p>
                    <Editable
                      isEdit={isEdit}
                      onEdit={onEdit}
                      keyData='payment_status'
                      defaultData={project?.payment_status ?? 0}
                      customData={(val) => <p>{val} %</p>}
                      onUpdate={(val) => {
                        update({ id, payload: { payment_status: Number(val) } })
                      }}
                    />
                  </DataSheet>
                  <DataSheet>
                    <p className='text-dark/50'>Tanggal dibuat</p>
                    {project?.date_created ? (
                      <p className='text-dark'>
                        {format(project?.date_created, 'EEEE, dd MMM yyyy', {
                          locale: indonesia,
                        })}
                      </p>
                    ) : (
                      <></>
                    )}
                  </DataSheet>
                  <DataSheet>
                    <p className='text-dark/50'>Tanggal mulai</p>
                    <Editable
                      isEdit={isEdit}
                      onEdit={onEdit}
                      keyData='date_started'
                      type='date'
                      defaultData={project?.date_started}
                      customData={(val) => (
                        <p>
                          {format(val, 'EEEE, dd MMM yyyy', {
                            locale: indonesia,
                          })}
                        </p>
                      )}
                      onUpdate={(val) => {
                        update({
                          id,
                          payload: { date_started: new Date(val) },
                        })
                      }}
                    />
                  </DataSheet>
                  <DataSheet>
                    <p className='text-dark/50'>Tanggal berakhir</p>
                    <Editable
                      isEdit={isEdit}
                      onEdit={onEdit}
                      keyData='date_ended'
                      type='date'
                      defaultData={project?.date_ended}
                      customData={(val) => (
                        <p>
                          {format(val, 'EEEE, dd MMM yyyy', {
                            locale: indonesia,
                          })}
                        </p>
                      )}
                      onUpdate={(val) => {
                        update({ id, payload: { date_ended: new Date(val) } })
                      }}
                    />
                  </DataSheet>
                  <EmployeeProject
                    id={id}
                    data={{
                      employees: project?.employees || [],
                      leadId: project?.leadId || null,
                    }}
                  />
                  <AttachmentProject
                    projectId={project?.id}
                    attachments={project?.attachments}
                  />
                  <BorrowedProject id={id} />
                </div>
              </div>
            </Tab>
            <Tab label='Aktivitas'>
              <div className='px-4 py-4 bg-[#FBFBFB] min-h-[calc(100vh-400px)]'>
                <ActivityProject id={project?.id} />
              </div>
            </Tab>
            <Tab label='Estimasi'>
              <div className='p-4 bg-[#FBFBFB] min-h-[calc(100vh-400px)]'>
                <EstimateProject
                  projectId={project?.id}
                  estimation={project?.ProjectEstimate}
                />
              </div>
            </Tab>
          </Tabs>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

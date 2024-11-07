import Chips from '@/components/common/chips'
import DataSheet from '@/components/common/data-sheet'
import { Editable } from '@/components/common/editable'
import { Tab, Tabs } from '@/components/tab'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useProject, useUpdateProject } from '@/hooks/api/use-project'
import { cn } from '@/utils/cn'
import { ProjectDetail } from '@/utils/types/api'
import { useCallback, useMemo, useState } from 'react'
import LabelProject from './detail/label-project'
import UserProject from './detail/user-project'
import LeadProject from './detail/lead-project'
import { formatToRupiah } from '@/utils/formatCurrency'
import { format } from 'date-fns'
import { id as indonesia } from 'date-fns/locale'
import EmployeeProject from './detail/employee-project'
import AttachmentProject from './detail/attachment-project'
import ActivityProject from './detail/activity-project'
import EstimateProject from './detail/estimate-project'
import { EditorDescription } from '@/components/tiptap/editor-description'
import { Button } from '@/components/ui/button'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
}

export default function DetailProject({ open, setOpen, id }: Props) {
  const { mutate: update } = useUpdateProject()

  const [content, setContent] = useState('')

  const { data, isLoading, isFetching } = useProject(id)
  const project: ProjectDetail | null = useMemo(
    () => data?.data.data || null,
    [data, isLoading, isFetching]
  )

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
                  <div
                    className='w-full px-4 border rounded py-2 border-line'
                    dangerouslySetInnerHTML={{ __html: val }}
                  />
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
                <Chips
                  background={project?.boardItems?.container.color}
                  text={project?.boardItems?.container.name}
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

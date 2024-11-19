import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Lightbox from 'yet-another-react-lightbox'

import { formatToRupiah } from '@/utils/formatCurrency'
import { useCallback, useMemo, useState } from 'react'
import { atom, useAtom, useAtomValue } from 'jotai'
import { id as indonesia } from 'date-fns/locale'
import { ChevronLeft, Ellipsis } from 'lucide-react'
import { format } from 'date-fns'

import { socket } from '@/utils/socket'
import { cn } from '@/utils/cn'

import { permissionAtom } from '@/atom/permission'

import {
  useProject,
  useUpdateProject,
  useUpdateStatusProject,
} from '@/hooks/api/use-project'
import { useApiData } from '@/hooks/use-api-data'
import { useBoards } from '@/hooks/api/use-board'

import ProtectedComponent from '@/components/protected'
import DataSheet from '@/components/common/data-sheet'
import Chips from '@/components/common/chips'
import { EditorDescription } from '@/components/tiptap/editor-description'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Editable } from '@/components/common/editable'
import { Button } from '@/components/ui/button'
import { Tab, Tabs } from '@/components/tab'
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { useIsMobile } from '@/hooks/use-mobile'
import { Separator } from '@/components/ui/separator'

export const lightboxAtom = atom<{
  isOpen: boolean
  currentIndex: number
  slides: Array<{ src: string }>
}>({
  isOpen: false,
  currentIndex: 0,
  slides: [],
})

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
  withSocket?: boolean
}
export default function DetailProject({
  open,
  setOpen,
  id,
  withSocket,
}: Props) {
  const permission = useAtomValue(permissionAtom)
  const isMobile = useIsMobile()
  const { mutate: update } = useUpdateProject()
  const { mutate: updateStatus } = useUpdateStatusProject()

  const [lightboxState, setLightboxState] = useAtom(lightboxAtom)
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

  const isAllowed = permission.includes('project:update')

  if (!id) return null

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={false}>
      <SheetContent
        className='w-full min-w-[initial] md:min-w-[520px] p-0'
        showClose={!isMobile}
      >
        <div className='h-12 w-full flex gap-4 items-center border-b border-line px-4'>
          {isMobile && (
            <>
              <Button
                className='h-8 p-0.5 pl-2 pr-3 inline-flex w-fit gap-1.5'
                variant='secondary'
                onClick={() => setOpen(false)}
              >
                <ChevronLeft className='h-4 w-4 text-dark' />
                Tutup
              </Button>
              <Separator orientation='vertical' className='h-7' />
            </>
          )}
          <p className='text-dark'>Detail Proyek</p>
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
                    update(
                      { id, payload: { name: val as string } },
                      {
                        onSuccess: () => {
                          if (withSocket) {
                            socket.emit('request_board')
                          }
                        },
                      }
                    )
                  }}
                  disabled={!isAllowed}
                />
                <ProtectedComponent
                  required={['project:archive', 'project:delete']}
                >
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
                      <ProtectedComponent required={['project:archive']}>
                        <DropdownMenuItem
                          onClick={() => {
                            update(
                              {
                                id,
                                payload: { isArchive: !project?.isArchive },
                              },
                              {
                                onSuccess: () => {
                                  if (withSocket) {
                                    socket.emit('request_board')
                                  }
                                },
                              }
                            )
                          }}
                        >
                          {project?.isArchive ? 'Batal' : 'Arsipkan'}
                        </DropdownMenuItem>
                      </ProtectedComponent>
                      <ProtectedComponent required={['project:delete']}>
                        <DropdownMenuItem
                          onClick={() => {
                            update(
                              { id, payload: { isDeleted: true } },
                              {
                                onSuccess: () => {
                                  if (withSocket) {
                                    socket.emit('request_board')
                                  }
                                },
                              }
                            )
                          }}
                        >
                          Hapus
                        </DropdownMenuItem>
                      </ProtectedComponent>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </ProtectedComponent>
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
                disabled={!isAllowed}
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
                    updateStatus(
                      { id, containerId: val as string },
                      {
                        onSuccess: () => {
                          if (withSocket) {
                            socket.emit('request_board')
                          }
                        },
                      }
                    )
                  }}
                  disabled={!isAllowed}
                />
              </DataSheet>
              <DataSheet
                className={cn(
                  project?.labels && project?.labels.length > 1 && 'items-start'
                )}
              >
                <p className='text-dark/50'>Label</p>
                <LabelProject
                  id={id}
                  data={{ labels: project?.labels || [] }}
                  withSocket={withSocket}
                  permission={permission}
                />
              </DataSheet>
              <DataSheet>
                <p className='text-dark/50'>Klien</p>
                <UserProject
                  id={id}
                  data={{ client: project?.client }}
                  withSocket={withSocket}
                  permission={permission}
                />
              </DataSheet>
              <DataSheet>
                <p className='text-dark/50'>Penanggung Jawab</p>
                <LeadProject
                  id={id}
                  data={{ lead: project?.lead }}
                  permission={permission}
                />
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
                    update(
                      { id, payload: { progress: Number(val) } },
                      {
                        onSuccess: () => {
                          if (withSocket) {
                            socket.emit('request_board')
                          }
                        },
                      }
                    )
                  }}
                  disabled={!isAllowed}
                />
              </DataSheet>
            </div>
          </div>
          <Tabs>
            <Tab label='Info'>
              <div className='px-4 pb-10 pt-4 bg-[#FBFBFB] min-h-[calc(100vh-400px)]'>
                <div className='flex flex-col gap-4'>
                  <ProtectedComponent required={['project:read-value']}>
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
                        disabled={!isAllowed}
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
                          update({
                            id,
                            payload: { payment_status: Number(val) },
                          })
                        }}
                        disabled={!isAllowed}
                      />
                    </DataSheet>
                  </ProtectedComponent>
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
                      disabled={!isAllowed}
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
                        update(
                          { id, payload: { date_ended: new Date(val) } },
                          {
                            onSuccess: () => {
                              if (withSocket) {
                                socket.emit('request_board')
                              }
                            },
                          }
                        )
                      }}
                      disabled={!isAllowed}
                    />
                  </DataSheet>
                  <EmployeeProject
                    id={id}
                    data={{
                      employees: project?.employees || [],
                      leadId: project?.leadId || null,
                    }}
                    withSocket={withSocket}
                    permission={permission}
                  />
                </div>
              </div>
            </Tab>
            <Tab label='Aktivitas'>
              <div className='px-4 py-4 bg-[#FBFBFB] min-h-[calc(100vh-400px)]'>
                <ActivityProject id={project?.id} />
              </div>
            </Tab>
            <Tab label='Lampiran'>
              <div className='px-4 py-4 bg-[#FBFBFB] min-h-[calc(100vh-400px)]'>
                <AttachmentProject
                  projectId={project?.id}
                  attachments={project?.attachments}
                  withSocket={withSocket}
                  permission={permission}
                />
              </div>
            </Tab>
            <Tab label='Peminjaman'>
              <div className='px-4 py-4 bg-[#FBFBFB] min-h-[calc(100vh-400px)]'>
                <BorrowedProject id={id} />
              </div>
            </Tab>
            <Tab label='Estimasi'>
              <div className='p-4 bg-[#FBFBFB] min-h-[calc(100vh-400px)]'>
                <EstimateProject
                  projectId={project?.id}
                  estimation={project?.ProjectEstimate}
                  date_started={project?.date_started}
                />
              </div>
            </Tab>
          </Tabs>
        </ScrollArea>
        <Lightbox
          plugins={[Zoom]}
          open={lightboxState.isOpen}
          close={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
          slides={lightboxState.slides}
          index={lightboxState.currentIndex}
        />
      </SheetContent>
    </Sheet>
  )
}

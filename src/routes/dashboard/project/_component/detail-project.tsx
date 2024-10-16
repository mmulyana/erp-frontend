import { Editable } from '@/components/common/editable'
import Label from '@/components/common/label'
import { Tab, Tabs } from '@/components/tab'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useProject } from '@/hooks/api/use-project'
import { format } from 'date-fns'
import { id as indonesia } from 'date-fns/locale'
import { useMemo } from 'react'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
}

export default function DetailProject({ open, setOpen, id }: Props) {
  const { data, isLoading, isFetching } = useProject(id)
  const project = useMemo(
    () => data?.data.data || {},
    [data, isLoading, isFetching]
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className='p-0 max-w-full min-w-full sm:min-w-[480px]'>
        <div className='h-12 w-full flex gap-2 items-center border-b border-line px-4'>
          <p className='text-sm text-dark'>Detail Proyek</p>
        </div>
        <ScrollArea className='h-[calc(100vh-48px)]'>
          <div className='px-6 pt-4 mb-8'>
            <Editable
              isEdit={false}
              keyData='name'
              defaultData={project?.name}
              className='text-lg font-medium text-dark'
            />
            <Editable
              isEdit={false}
              keyData='description'
              defaultData={project?.description}
              className='text-sm text-dark/50'
            />
            <div className='flex mt-4 justify-between'>
              <div className='flex flex-col gap-3 w-fit'>
                <div className='flex gap-2 items-center'>
                  <div className='w-[140px] flex-shrink-0'>
                    <p className='text-dark/50 text-sm'>Status</p>
                  </div>
                  <div className='flex-grow'>
                    <div className='border px-2 py-0.5 rounded-full border-dark/10 inline-flex items-center gap-1.5 w-fit text-sm'>
                      <div
                        className='w-1.5 h-1.5 rounded-full'
                        style={{
                          background: project?.boardItems?.container?.color,
                        }}
                      />
                      {project?.boardItems?.container?.name}
                    </div>
                  </div>
                </div>
                <div className='flex gap-2 items-center'>
                  <div className='w-[140px] flex-shrink-0'>
                    <p className='text-dark/50 text-sm'>Label</p>
                  </div>
                  <div className='flex-grow'>
                    <div className='flex gap-1 items-center flex-wrap'>
                      {project?.labels &&
                        project.labels.map((item: any, index: number) => (
                          <Label
                            key={`labels-${index}`}
                            color={item.label.color}
                            name={item.label.name}
                          />
                        ))}
                    </div>
                  </div>
                </div>
                <div className='flex gap-2 items-center'>
                  <div className='w-[140px] flex-shrink-0'>
                    <p className='text-dark/50 text-sm'>User</p>
                  </div>
                  <div className='flex-grow'>
                    <div className='border pr-2.5 pl-1 py-1 rounded-full border-dark/10 inline-flex items-center gap-1.5 w-fit text-sm'>
                      {project?.client && (
                        <>
                          <div className='w-6 h-6 rounded-full bg-blue-900 flex items-center justify-center text-white'>
                            <span>{project.client.name.at(0)}</span>
                          </div>
                          <p className='text-dark'>{project.client.name}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex gap-2 items-center'>
                  <div className='w-[140px] flex-shrink-0'>
                    <p className='text-dark/50 text-sm'>Penanggung Jawab</p>
                  </div>
                  <div className='flex-grow'>
                    <div className='border pr-2.5 pl-1 py-1 rounded-full border-dark/10 inline-flex items-center gap-1.5 w-fit text-sm'>
                      {project?.lead && (
                        <>
                          {project.lead.photo ? (
                            <img className='w-6 h-6 rounded-full' />
                          ) : (
                            <div className='w-6 h-6 rounded-full bg-blue-900 flex items-center justify-center text-white'>
                              <span>{project.lead.fullname.at(0)}</span>
                            </div>
                          )}
                          <p className='text-dark'>{project.lead.fullname}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex gap-2 items-center'>
                  <div className='w-[140px] flex-shrink-0'>
                    <p className='text-dark/50 text-sm'>Pegawai</p>
                  </div>
                  <div className='flex-grow'></div>
                </div>
                <div className='flex gap-2 items-center'>
                  <div className='w-[140px] flex-shrink-0'>
                    <p className='text-dark/50 text-sm'>
                      Nilai Proyek <span className='text-red-400'>*</span>
                    </p>
                  </div>
                  <div className='flex-grow'>
                    <p>{project?.net_value}</p>
                  </div>
                </div>
                <div className='flex gap-2 items-center'>
                  <div className='w-[140px] flex-shrink-0'>
                    <p className='text-dark/50 text-sm'>Status pembayaran</p>
                  </div>
                  <div className='flex-grow'>
                    <p className='text-dark text-sm'>
                      {project?.payment_status}%
                    </p>
                  </div>
                </div>
                <div className='flex gap-2 items-center'>
                  <div className='w-[140px] flex-shrink-0'>
                    <p className='text-dark/50 text-sm'>Progress</p>
                  </div>
                  <div className='flex-grow'>
                    <p className='text-dark text-sm'>{project?.progress}%</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-3 w-fit'>
                <div className='space-y-1'>
                  <p className='text-dark/50 text-sm'>Tanggal dibuat</p>
                  <p className='text-dark text-sm'>
                    {project.date_created &&
                      format(
                        new Date(project?.date_created),
                        'EEEE, d MMMM yyyy',
                        {
                          locale: indonesia,
                        }
                      )}
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-dark/50 text-sm'>Tanggal dimulai</p>
                  <p className='text-dark text-sm'>
                    {project.date_started &&
                      format(
                        new Date(project?.date_started),
                        'EEEE, d MMMM yyyy',
                        {
                          locale: indonesia,
                        }
                      )}
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-dark/50 text-sm'>Tanggal berakhir</p>
                  <p className='text-dark text-sm'>
                    {project.date_ended &&
                      format(
                        new Date(project?.date_ended),
                        'EEEE, d MMMM yyyy',
                        {
                          locale: indonesia,
                        }
                      )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Tabs>
            <Tab label='Aktivitas'>
                <div className='px-6 py-4 bg-[#FBFBFB]'>
                <p>Aktivitas</p>
              </div>
            </Tab>
            <Tab label='Estimasi pengeluaran'>
              <div className='px-6 py-4'>
                <p>Estimasi</p>
              </div>
            </Tab>
          </Tabs>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

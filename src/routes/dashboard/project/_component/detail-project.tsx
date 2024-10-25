import Chips from '@/components/common/chips'
import DataSheet from '@/components/common/data-sheet'
import { Editable } from '@/components/common/editable'
import { Tab, Tabs } from '@/components/tab'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useProject } from '@/hooks/api/use-project'
import { cn } from '@/utils/cn'
import { ProjectDetail } from '@/utils/types/api'
import { useCallback, useMemo, useState } from 'react'
import LabelProject from './detail/label-project'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
}

export default function DetailProject({ open, setOpen, id }: Props) {
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
      <SheetContent className='p-0 max-w-full min-w-[447=8px]'>
        <div className='h-12 w-full flex gap-2 items-center border-b border-line px-4'>
          <p className='text-sm text-dark'>Detail Proyek</p>
        </div>
        <ScrollArea className='h-[calc(100vh-48px)]'>
          <div className='px-6 pt-4 mb-8'>
            <div className='space-y-2'>
              <Editable
                isEdit={isEdit}
                onEdit={onEdit}
                keyData='name'
                defaultData={project?.name}
                className='text-xl font-medium text-dark'
              />
              <Editable
                isEdit={isEdit}
                onEdit={onEdit}
                keyData='description'
                defaultData={project?.description}
                className='text-dark/50'
              />
            </div>
            <div className='flex mt-4 justify-between flex-col gap-4'>
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
                <p></p>
              </DataSheet>
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

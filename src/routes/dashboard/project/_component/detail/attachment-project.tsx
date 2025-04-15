import { Ellipsis, Eye, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { useMemo, useState } from 'react'

import {
  useDeleteAttachment,
  useUpdateAttachment,
} from '@/hooks/api/use-attachment'

import { BASE_URL } from '@/shared/constants/_urls'
import { Attachment } from '@/utils/types/api'
import { socket } from '@/shared/utils/socket'
import { cn } from '@/shared/utils/cn'

import AlertDialogV1 from '@/components/common/alert-dialog-v1'
import { Button, buttonVariants } from '@/components/ui/button'
import ProtectedComponent from '@/components/protected'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import AttachmentDialog from './attachment-dialog'

import EmptyState from '@/components/common/empty-state'
import FileIcon from '@/components/common/file-icon'
import { useQueryClient } from '@tanstack/react-query'
import { KEYS } from '@/shared/constants/_keys'

type Props = {
  projectId?: number
  attachments?: Attachment[]
  withSocket?: boolean
  permission?: string[]
}

export default function AttachmentProject({
  projectId,
  attachments,
  withSocket,
  permission,
}: Props) {
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<null | {
    id: number
    type: 'delete' | 'publish' | 'hide'
    open: boolean
  }>(null)

  const { mutate: removeAttachment } = useDeleteAttachment()
  const { mutate: updateAttachment } = useUpdateAttachment()

  const title = {
    publish: 'Ubah lampiran jadi publik',
    delete: 'Hapus lampiran',
    hide: 'Ubah lampiran jadi privat',
  }
  const body = {
    publish: 'Lampiran ini dapat diakses semua pengguna di sistem',
    hide: 'Lampiran ini tidak dapat diakses semua pengguna hanya pengguna yang diberi izin yang dapat melihat lampiran ini',
    delete: 'Lampiran ini akan dihapus dalam sistem',
  }

  const handleConfirm = () => {
    if (!selected) return

    if (selected.type == 'delete') {
      removeAttachment(
        { id: selected.id },
        {
          onSuccess: () => {
            setSelected(null)
            queryClient.invalidateQueries({
              queryKey: [KEYS.PROJECT_DETAIL, projectId],
            })
            if (withSocket) socket.emit('request_board')
          },
        }
      )
    }
    if (selected.type == 'hide') {
      updateAttachment(
        { id: selected.id, payload: { isSecret: 'true' } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [KEYS.PROJECT_DETAIL, projectId],
            })
            setSelected(null)
          },
        }
      )
    }
    if (selected.type == 'publish') {
      updateAttachment(
        { id: selected.id, payload: { isSecret: 'false' } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [KEYS.PROJECT_DETAIL, projectId],
            })
            setSelected(null)
          },
        }
      )
    }
  }

  const allowedReadSecret = permission?.includes(
    'project:read-secret-attachment'
  )

  const files = useMemo(
    () =>
      attachments?.filter((item) =>
        allowedReadSecret ? item : !item.isSecret
      ) || [],
    [attachments]
  )

  return (
    <>
      <div className='flex flex-col gap-4 mt-2'>
        {files && !!files.length ? (
          files.map((item, index) => (
            <div
              className='flex justify-between items-center'
              key={`attachment-${index}`}
            >
              <div className='flex gap-2.5 items-center'>
                <FileIcon type={item.type ?? ''} />
                <div>
                  <div className='flex gap-2 items-center'>
                    <p className='text-dark leading-5 text-sm'>
                      {item.name}.{item.type}
                    </p>
                    {item.isSecret && <Lock size={14} />}
                  </div>
                  <p className='text-dark/40 text-sm leading-4'>
                    {format(item.uploaded_at, 'dd/MM/yy')}
                  </p>
                </div>
              </div>
              <div className='flex gap-2'>
                <Link
                  to={BASE_URL + '/files/' + item.file}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'w-8 h-8 rounded-full border border-dark/[0.12] p-0 text-dark'
                  )}
                >
                  <Eye size={16} />
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className='w-8 h-8 rounded-full border border-dark/[0.12] p-0'
                      variant='outline'
                    >
                      <Ellipsis size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='min-w-fit -translate-x-4'>
                    <DropdownMenuItem>
                      <Link to={BASE_URL + '/files/' + item.file} download>
                        Unduh
                      </Link>
                    </DropdownMenuItem>
                    <ProtectedComponent
                      required={['project:read-secret-attachment']}
                    >
                      <DropdownMenuItem
                        onClick={() => {
                          setSelected({
                            id: item.id,
                            type: item.isSecret ? 'publish' : 'hide',
                            open: true,
                          })
                        }}
                      >
                        Jadikan {item.isSecret ? 'publik' : 'privat'}
                      </DropdownMenuItem>
                    </ProtectedComponent>
                    <ProtectedComponent
                      required={['project:delete-attachment']}
                    >
                      <DropdownMenuItem
                        onClick={() => {
                          setSelected({
                            id: item.id,
                            type: 'delete',
                            open: true,
                          })
                        }}
                      >
                        Hapus
                      </DropdownMenuItem>
                    </ProtectedComponent>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <EmptyState className='mt-4' />
        )}
      </div>
      <div className='mt-4 flex justify-center'>
        <ProtectedComponent required={['project:upload-attachment']}>
          <Button
            variant='secondary'
            className='text-sm text-dark font-normal mx-auto'
            onClick={() => setOpen(!open)}
          >
            Tambah
          </Button>
        </ProtectedComponent>
      </div>
      <AttachmentDialog
        open={open}
        setOpen={setOpen}
        projectId={projectId}
        id={selected?.id}
        withSocket={withSocket}
      />
      <AlertDialogV1
        open={selected?.open}
        setOpen={() => setSelected(null)}
        title={!!selected ? title[selected?.type] : ''}
        body={!!selected ? body[selected?.type] : ''}
        onConfirm={handleConfirm}
        className='border border-red-500'
      />
    </>
  )
}

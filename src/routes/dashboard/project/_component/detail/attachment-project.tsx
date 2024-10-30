import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { format } from 'date-fns'
import { Ellipsis, Eye, FileSpreadsheet, Lock } from 'lucide-react'
import { useState } from 'react'
import AttachmentDialog from './attachment-dialog'
import { Attachment } from '@/utils/types/api'
import {
  useDeleteAttachment,
  useUpdateAttachment,
} from '@/hooks/api/use-attachment'
import { Link } from 'react-router-dom'
import { BASE_URL } from '@/utils/constant/_urls'
import { cn } from '@/utils/cn'
import AlertDialogV1 from '@/components/common/alert-dialog-v1'

type Props = {
  projectId?: number
  attachments?: Attachment[]
}

export default function AttachmentProject({ projectId, attachments }: Props) {
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
        { onSuccess: () => setSelected(null) }
      )
    }
    if (selected.type == 'hide') {
      updateAttachment(
        { id: selected.id, payload: { isSecret: true } },
        { onSuccess: () => setSelected(null) }
      )
    }
    if (selected.type == 'publish') {
      updateAttachment(
        { id: selected.id, payload: { isSecret: false } },
        { onSuccess: () => setSelected(null) }
      )
    }
  }

  return (
    <>
      <div className='mt-4'>
        <div className='w-full pb-2 border-b border-line flex justify-between items-center'>
          <p className='text-dark/50'>Lampiran</p>
          <Button
            variant='secondary'
            className='text-sm text-dark font-normal'
            onClick={() => setOpen(!open)}
          >
            Tambah
          </Button>
        </div>
        <div className='flex flex-col gap-2 mt-2'>
          {attachments?.map((item) => (
            <div className='flex justify-between items-center'>
              <div className='flex gap-2.5 items-center'>
                <div className='h-10 w-10 rounded-lg bg-dark/10 text-dark flex items-center justify-center'>
                  <FileSpreadsheet size={24} />
                </div>
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
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AttachmentDialog
        open={open}
        setOpen={setOpen}
        projectId={projectId}
        id={selected?.id}
      />
      <AlertDialogV1
        open={selected?.open}
        setOpen={() => setSelected(null)}
        title={!!selected ? title[selected?.type] : ''}
        body={!!selected ? body[selected?.type] : ''}
        onConfirm={handleConfirm}
      />
    </>
  )
}

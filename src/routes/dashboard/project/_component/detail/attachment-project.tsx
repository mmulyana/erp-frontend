import { Button } from '@/components/ui/button'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { format } from 'date-fns'
import { Download, Ellipsis, FileSpreadsheet } from 'lucide-react'
import { useState } from 'react'
import AttachmentDialog from './attachment-dialog'
import { Attachment } from '@/utils/types/api'
import { useDeleteAttachment } from '@/hooks/api/use-attachment'

type Props = {
  projectId?: number
  attachments?: Attachment[]
}

export default function AttachmentProject({ projectId, attachments }: Props) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<null | {
    id: number
    type: 'delete' | 'edit' | 'publish' | 'hide'
  }>(null)

  const { mutate: removeAttachment } = useDeleteAttachment()

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
                  <p className='text-dark leading-5 text-sm'>
                    {item.name}.{item.type}
                  </p>
                  <p className='text-dark/40 text-sm leading-4'>
                    {format(item.uploaded_at, 'dd/MM/yy')}
                  </p>
                </div>
              </div>
              <div className='flex gap-2'>
                <Button
                  className='w-8 h-8 rounded-full border border-dark/[0.12] p-0'
                  variant='ghost'
                >
                  <Download size={16} />
                </Button>
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
                    <DropdownMenuItem
                      onClick={() => removeAttachment({ id: item.id })}
                    >
                      Hapus
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AttachmentDialog open={open} setOpen={setOpen} projectId={projectId} />
    </>
  )
}

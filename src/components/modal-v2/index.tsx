import { X } from 'lucide-react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { cn } from '@/utils/cn'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  icon?: React.ReactNode
  children: React.ReactNode
  title: string
}
export default function Modal({ open, setOpen, title, icon, children }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogContent
        className='p-0 border-none gap-0'
        showClose={false}
        close={<CustomClose setOpen={setOpen} />}
      >
        <div className='bg-[#F9FAFB] h-10 px-4 flex gap-2 border-b border-[#EFF0F2] rounded-t-md items-center'>
          {!!icon && icon}
          <p className='text-[#313951]'>{title}</p>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  )
}

type CloseProps = {
  setOpen: (val: boolean) => void
}
function CustomClose({ setOpen }: CloseProps) {
  return (
    <div className='absolute top-0 right-2 h-10 flex items-center'>
      <button
        className='h-7 w-7 flex justify-center items-center rounded'
        onClick={() => setOpen(false)}
      >
        <X className='h-4 w-4' />
        <span className='sr-only'>Close</span>
      </button>
    </div>
  )
}

type ModalProps = {
  children: React.ReactNode
  setOpen: (val: boolean) => void
  className?: string
}
export function ModalContainer({ children, setOpen, className }: ModalProps) {
  return (
    <>
      <div className={cn('p-4 space-y-4', className)}>{children}</div>
      <div className='rounded-b-md px-4 py-4 bg-[#F4F4F7] border-t border-[#EFF0F2] flex justify-end gap-2 items-center'>
        <Button
          type='button'
          variant='secondary'
          onClick={() => setOpen(false)}
        >
          Batal
        </Button>
        <Button>Simpan</Button>
      </div>
    </>
  )
}

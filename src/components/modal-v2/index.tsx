import { X } from 'lucide-react'
import { Dialog, DialogContent } from '../ui/dialog'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  icon?: React.ReactNode
  children: React.ReactNode
  title: string
  subtitle?: string
}
export default function Modal({
  open,
  setOpen,
  title,
  subtitle,
  icon,
  children,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className='p-0 border-none gap-0'
        showClose={false}
        customClose={<CustomClose setOpen={setOpen} />}
      >
        <div className='bg-[#F9FAFB] py-4 px-4 flex gap-2 border-b border-[#EFF0F2] rounded-t-lg'>
          {!!icon && icon}
          <div className='space-y-1'>
            <p className='text-[#313951] text-sm font-medium'>{title}</p>
            {!!subtitle && (
              <p className='text-[#313951]/50 text-sm font-medium'>
                {subtitle}
              </p>
            )}
          </div>
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
    <button
      className='absolute -right-4 -top-4 h-8 w-8 rounded-full bg-[#FFFFFF] border border-[#EFF0F2] flex justify-center items-center'
      onClick={() => setOpen(false)}
    >
      <X className='h-4 w-4' />
      <span className='sr-only'>Close</span>
    </button>
  )
}

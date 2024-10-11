import { Ellipsis } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { cn } from '@/utils/cn'

export default function DropdownEdit({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='border-transparent hover:border-gray-200'
      >
        <Button
          variant='outline'
          className='p-0 h-5 w-5 border border-line rounded px-0.5'
        >
          <Ellipsis className='w-4 h-4 text-[#313951]' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn('!min-w-[48px] right-0 px-0', className)}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

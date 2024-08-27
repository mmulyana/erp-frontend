import { useMediaQuery } from '@uidotdev/usehooks'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ListFilter } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useState } from 'react'

export default function Filter() {
  const [open, setOpen] = useState(false)
  const isSmall = useMediaQuery('only screen and (max-width : 768px)')

  if (isSmall) {
    return (
      <>
        <Button
          variant='outline'
          className='h-8 flex gap-1 items-center border border-[#EFF0F2] rounded-[8px] shadow-md shadow-gray-100'
          onClick={() => setOpen(true)}
        >
          <ListFilter className='w-4 h-4 text-[#7277F6]' />
          <p className='text-sm text-[#313951]'>Filter</p>
        </Button>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filter</DrawerTitle>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            className='h-8 flex gap-1 items-center border border-[#EFF0F2] rounded-[8px] shadow-md shadow-gray-100'
          >
            <ListFilter className='w-4 h-4 text-[#7277F6]' />
            <p className='text-sm text-[#313951]'>Filter</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[400px] sm:ml-0 md:ml-[310px] pb-10'></DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

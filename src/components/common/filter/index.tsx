import { useMediaQuery } from '@uidotdev/usehooks'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FilterIcon } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import React, { useState } from 'react'
import { cn } from '@/utils/cn'

export default function Filter({
  children,
  styleFilter,
  fill,
}: {
  children?: React.ReactNode
  styleFilter?: string
  fill?: string
}) {
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
          <FilterIcon
            fill={fill || '#F9A861'}
            className={cn('w-4 h-4 text-[#F9A861]', styleFilter)}
          />
          <p className='text-sm text-dark font-normal'>Filter</p>
        </Button>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filter</DrawerTitle>
            </DrawerHeader>
            {children}
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
            className='h-8 flex gap-1 items-center border border-[#EFF0F2] rounded-[8px] shadow-md shadow-gray-100 pl-1.5 pr-2.5'
          >
            <FilterIcon
              fill={fill || '#DCE1EB'}
              className={cn('w-4 h-4 text-[#F9A861] fill-[#F9A861]', styleFilter)}
            />
            <p className='text-sm text-dark font-normal'>Filter</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='max-w-[400px] p-0'>
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

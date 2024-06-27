import { useMediaQuery } from '@uidotdev/usehooks'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useState } from 'react'

type Props = {
  id?: number
}

let text = {
  title: 'Confirm Account Deletion',
  body: 'Are you sure you want to delete this account?',
}

export default function Delete(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const isSmall = useMediaQuery('only screen and (max-width : 768px)')

  if (isSmall) {
    return (
      <>
        <Button
          variant='ghost'
          className='text-gray-400 hover:text-red-400'
          onClick={() => setIsOpen(!isOpen)}
        >
          <Trash className='h-4 w-4' />
        </Button>
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{text.title}</DrawerTitle>
              <DrawerDescription>{text.body}</DrawerDescription>
            </DrawerHeader>

            <DrawerFooter className='grid grid-cols-2 px-4 gap-4'>
              <Button
                type='button'
                onClick={() => setIsOpen(false)}
                variant='outline'
                className='w-full'
              >
                Cancel
              </Button>
              <Button type='submit' variant='destructive'>
                Delete
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant='ghost'
        className='text-gray-400 hover:text-red-400'
      >
        <Trash className='h-4 w-4' />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='sm:max-w-[480px]'>
          <DialogHeader>
            <DialogTitle>{text.title}</DialogTitle>
            <DialogDescription>{text.body}</DialogDescription>
          </DialogHeader>

          <DialogFooter className='grid grid-cols-2 gap-4 px-0 w-full'>
            <Button
              type='button'
              onClick={() => setIsOpen(false)}
              variant='outline'
            >
              Cancel
            </Button>
            <Button type='submit' variant='destructive'>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

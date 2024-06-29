import { useMediaQuery } from '@uidotdev/usehooks'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type Props = {
  isOpen: boolean
  setIsOpen: (val: boolean) => void
  title?: string
  body?: string
  className?: {
    dialog?: string
  }
}
export default function ResponsiveModal({
  children,
  ...props
}: React.PropsWithChildren & Props) {
  const isSmall = useMediaQuery('only screen and (max-width : 768px)')

  if (isSmall) {
    return (
      <Drawer open={props.isOpen} onOpenChange={props.setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{props.title}</DrawerTitle>
            <DrawerDescription>{props.body}</DrawerDescription>
          </DrawerHeader>
          <div className='p-4'>{children}</div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={props.isOpen} onOpenChange={props.setIsOpen}>
      <DialogContent className={props.className?.dialog}>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.body}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

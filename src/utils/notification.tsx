import { Toaster } from '@/components/ui/sonner'

export default function NotificationWrapper({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      {children}
      <Toaster richColors theme='light' position='bottom-right'/>
    </>
  )
}

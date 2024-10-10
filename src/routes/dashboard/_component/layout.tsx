import { useMediaQuery } from '@uidotdev/usehooks'
import Header from './header'
import Sidebar from './sidebar'
import { cn } from '@/utils/cn'
import { useState } from 'react'

export function DashboardLayout({ children }: React.PropsWithChildren) {
  const [open, setOpen] = useState(false)
  const isSmall = useMediaQuery('only screen and (max-width : 768px)')

  return (
    <>
      <Sidebar open={open} setOpen={setOpen} />
      <div className={cn(isSmall ? 'pl-0' : 'pl-[264px]')}>
        <Header />
        <div>{children}</div>
      </div>
    </>
  )
}

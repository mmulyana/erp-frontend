import { cn } from '@/utils/cn'
import { SidebarProvider } from '@/components/ui/sidebar'

import Setting from './setting/setting'
import Sidebar from './sidebar'
import Header from './header'
import Helpdesk from './helpdesk'

export function DashboardLayout({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <SidebarProvider>
      <Sidebar />
      <main className={cn('flex-grow', className)}>
        <Header />
        {children}
      </main>
      <Helpdesk />
      <Setting />
    </SidebarProvider>
  )
}

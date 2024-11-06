import { SidebarProvider } from '@/components/ui/sidebar'

import Setting from './setting/setting'
import Sidebar from './sidebar'
import Header from './header'

export function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      <Sidebar />
      <main className='flex-grow'>
        <Header />
        {children}
      </main>
      <Setting />
    </SidebarProvider>
  )
}

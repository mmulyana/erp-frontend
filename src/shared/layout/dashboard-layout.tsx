import { SidebarProvider } from '@/components/ui/sidebar'
import { cn } from '@/utils/cn'

import Setting from '../component/setting/setting'
import Sidebar from '../component/sidebar'
import Header from '../component/header'
import Helpdesk from '../component/helpdesk'

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

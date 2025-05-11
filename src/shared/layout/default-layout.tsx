import { SidebarProvider } from '@/shared/components/ui/sidebar'
import { cn } from '@/shared/utils/cn'

import Sidebar from '../components/common/sidebar'
import Header from '../components/common/header'

export function DefaultLayout({
	children,
	className,
	module,
}: React.PropsWithChildren & {
	className?: string
	module: 'hris' | 'project' | 'inventory'
}) {
	return (
		<SidebarProvider>
			<Header />
			<Sidebar module={module} />
			<main
				className={cn(
					'pt-[calc(68px+24px)] px-6 flex-1 pb-6 bg-[#F7F7F7]',
					className
				)}
			>
				{children}
			</main>
			{/* <Helpdesk /> */}
			{/* <Setting /> */}
		</SidebarProvider>
	)
}

import {
	FileBarChart,
	FileClock,
	FilePen,
	House,
	PieChart,
	Users,
} from 'lucide-react'

import { SidebarProvider } from '@/shared/components/ui/sidebar'
import { paths } from '@/shared/constants/_paths'
import { cn } from '@/shared/utils/cn'

import Sidebar, { SidebarLinkGroup } from '../components/sidebar'
import Header from '../components/header'

const navLinks: SidebarLinkGroup[] = [
	{
		links: [
			{
				href: paths.hris,
				icon: <House size={20} strokeWidth={2} />,
				name: 'Dashboard',
			},
		],
	},
	{
		groupName: 'Masterdata',
		links: [
			{
				href: paths.hrisMasterDataEmployee,
				icon: <Users size={20} />,
				name: 'Pegawai',
			},
		],
	},
	{
		groupName: 'Absensi',
		links: [
			{
				href: paths.hrisAttendanceRegular,
				icon: <FilePen size={20} />,
				name: 'Reguler',
			},
			{
				href: paths.hrisAttendanceOvertime,
				icon: <FileClock size={20} />,
				name: 'Lembur',
			},
			{
				href: paths.hrisAttendanceReport,
				icon: <PieChart size={20} />,
				name: 'Laporan',
			},
		],
	},
	{
		groupName: 'Kasbon',
		links: [
			{
				href: paths.hrisCashAdvance,
				icon: <FileBarChart size={20} />,
				name: 'Kasbon',
			},
			{
				href: paths.hrisCashAdvanceReport,
				icon: <PieChart size={20} />,
				name: 'Laporan',
			},
		],
	},
]

export function HrisLayout({
	children,
	className,
}: React.PropsWithChildren & { className?: string }) {
	return (
		<SidebarProvider>
			<Header />
			<Sidebar items={navLinks} />
			<main className={cn('pt-[calc(3rem+24px)] px-6 flex-1 pb-6', className)}>
				{children}
			</main>
			{/* <Helpdesk /> */}
			{/* <Setting /> */}
		</SidebarProvider>
	)
}

import {
	Blocks,
	BriefcaseBusiness,
	Building,
	ChevronLeft,
	FileBarChart,
	FileClock,
	FilePen,
	FolderClosed,
	Hammer,
	House,
	Key,
	PackageMinus,
	PackagePlus,
	Store,
	Tag,
	User,
	Users,
	Warehouse,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'

import { cn } from '@/shared/utils/cn'

import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { Button } from '@/shared/components/ui/button'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar,
} from '@/shared/components/ui/sidebar'

import { useActiveMenu } from '@/shared/hooks/use-active-menu'
import { paths } from '@/shared/constants/paths'
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from '@/shared/components/ui/tabs'

export type SidebarLinkGroup = {
	groupName?: string
	links: {
		href: string
		name: string
		icon: React.ReactNode
	}[]
}

export type AppSidebarProps = {
	module: string
}

type Links = {
	module: string
	items: SidebarLinkGroup[]
}

const hrisLink: SidebarLinkGroup[] = [
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
		groupName: 'Master Data',
		links: [
			{
				href: paths.hrisMasterdataEmployee,
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
		],
	},
	{
		groupName: 'Payroll',
		links: [
			{
				href: paths.hrisPayroll,
				icon: <FolderClosed size={20} />,
				name: 'Periode',
			},
			{
				href: paths.hrisSalarySlip,
				icon: <FileBarChart size={20} />,
				name: 'Slip gaji',
			},
		],
	},
]

const projectLink: SidebarLinkGroup[] = [
	{
		links: [
			{
				href: paths.project,
				icon: <House size={20} strokeWidth={2} />,
				name: 'Dashboard',
			},
		],
	},
	{
		groupName: 'Masterdata',
		links: [
			{
				href: paths.projectMasterdataProjects,
				icon: <BriefcaseBusiness size={20} strokeWidth={2} />,
				name: 'Proyek',
			},
			{
				href: paths.projectMasterdataClient,
				icon: <Users size={20} strokeWidth={2} />,
				name: 'Klien',
			},
			{
				href: paths.projectMasterdataClientCompany,
				icon: <Building size={20} strokeWidth={2} />,
				name: 'Perusahaan',
			},
		],
	},
]

const inventoryLink: SidebarLinkGroup[] = [
	{
		links: [
			{
				href: paths.inventory,
				icon: <House size={20} strokeWidth={2} />,
				name: 'Dashboard',
			},
		],
	},
	{
		groupName: 'Masterdata',
		links: [
			{
				href: paths.inventoryMasterdataItem,
				icon: <Hammer size={20} strokeWidth={2} />,
				name: 'Barang',
			},
			{
				href: paths.inventoryMasterdataLocation,
				icon: <Warehouse size={20} strokeWidth={2} />,
				name: 'Gudang',
			},
			{
				href: paths.inventoryMasterdataBrand,
				icon: <Tag size={20} strokeWidth={2} />,
				name: 'Merek',
			},
			{
				href: paths.inventoryMasterdataSupplier,
				icon: <Store size={20} strokeWidth={2} />,
				name: 'Supplier',
			},
		],
	},
	{
		groupName: 'Transaksi',
		links: [
			{
				href: paths.inventoryStockIn,
				icon: <PackagePlus size={20} strokeWidth={2} />,
				name: 'Stok masuk',
			},
			{
				href: paths.inventoryStockOut,
				icon: <PackageMinus size={20} strokeWidth={2} />,
				name: 'Stok keluar',
			},
			{
				href: paths.inventoryStockLoan,
				icon: <Blocks size={20} strokeWidth={2} />,
				name: 'Peminjaman',
			},
		],
	},
]

const adminLink: SidebarLinkGroup[] = [
	{
		links: [
			{
				href: paths.adminUser,
				icon: <User size={20} strokeWidth={2} />,
				name: 'User',
			},
			{
				href: paths.adminRole,
				icon: <Key size={20} strokeWidth={2} />,
				name: 'Role',
			},
		],
	},
]

const allLink: Links[] = [
	{
		module: 'hris',
		items: hrisLink,
	},
	{
		module: 'project',
		items: projectLink,
	},
	{
		module: 'inventory',
		items: inventoryLink,
	},
	{
		module: 'admin',
		items: adminLink,
	},
]

export default function AppSidebar({ module }: AppSidebarProps) {
	const { isMobile, toggleSidebar } = useSidebar()
	const menus = useActiveMenu()

	const allModules = allLink.map((mod) => mod.module)
	const [activeMobileModule, setActiveMobileModule] = useState(module)

	const getModuleItems = (mod: string) =>
		allLink.find((m) => m.module === mod)?.items ?? []

	const renderSidebarItems = (items: SidebarLinkGroup[]) => (
		<SidebarGroup className='px-0 py-0'>
			{items.map((group, groupIdx) => (
				<SidebarMenu key={groupIdx} className='mb-6'>
					{group.groupName && (
						<p className='text-sm w-full text-[#1E1E1E]/50 mb-4'>
							{group.groupName}
						</p>
					)}
					<SidebarMenuSubItem className='flex flex-col gap-4 w-full px-0'>
						{group.links.map((link, index) => (
							<SidebarMenuSubButton
								key={`${link.href}-${index}`}
								isActive={menus.path === link.href}
								className={cn(
									'px-4 h-10 w-full !overflow-auto relative',
									menus.path === link.href &&
										'shadow-[0_4px_4px_-2px_rgba(72,74,87,0.08)]'
								)}
								asChild
							>
								<Link to={link.href}>
									{menus.path === link.href && (
										<div className='absolute top-1/2 -translate-y-1/2 w-1.5 h-[24px] rounded-r-md bg-brand left-0'></div>
									)}
									<div
										className={cn(
											'flex items-center gap-2.5 text-[#919193]',
											menus.path === link.href && 'text-brand'
										)}
									>
										{link.icon}
										<span
											className={cn(
												'text-base text-ink-primary/80',
												menus.path === link.href && 'text-brand'
											)}
										>
											{link.name}
										</span>
									</div>
								</Link>
							</SidebarMenuSubButton>
						))}
					</SidebarMenuSubItem>
				</SidebarMenu>
			))}
		</SidebarGroup>
	)

	return (
		<Sidebar variant='sidebar' className='z-20 pt-[68px] bg-red-400'>
			<SidebarHeader className='block md:hidden'>
				{isMobile && (
					<Button
						className='ml-4 mt-2 h-8 p-0.5 pl-2 pr-3 mb-2 inline-flex w-fit gap-1.5 bg-[#F7F7F7]'
						variant='outline'
						onClick={toggleSidebar}
					>
						<ChevronLeft className='h-4 w-4 text-dark' />
						Tutup
					</Button>
				)}
			</SidebarHeader>

			<ScrollArea>
				<SidebarContent className='px-6 pt-0 md:pt-6'>
					{isMobile ? (
						<Tabs
							value={activeMobileModule}
							onValueChange={setActiveMobileModule}
						>
							<TabsList className='mb-4 border-b w-full rounded border-ink-primary/10'>
								{allModules.map((mod) => (
									<TabsTrigger
										key={mod}
										value={mod}
										className={cn(
											'flex-1 data-[state=active]:bg-white data-[state=inactive]:bg-transparent capitalize rounded-none font-medium data-[state=inactive]:hover:bg-gray-200 data-[state=active]:text-ink-primary data-[state=active]:before:bg-brand data-[state=active]:before:absolute data-[state=active]:before:w-full data-[state=active]:before:h-1 data-[state=active]:before:bottom-0 relative py-3'
										)}
									>
										{mod === 'hris' ? 'HRIS' : mod}
									</TabsTrigger>
								))}
							</TabsList>

							{allModules.map((mod) => (
								<TabsContent key={mod} value={mod}>
									{renderSidebarItems(getModuleItems(mod))}
								</TabsContent>
							))}
						</Tabs>
					) : (
						renderSidebarItems(getModuleItems(module))
					)}
				</SidebarContent>
			</ScrollArea>
		</Sidebar>
	)
}

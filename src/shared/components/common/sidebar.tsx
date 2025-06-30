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
import { permissions } from '@/shared/constants/permissions'
import usePermission from '@/shared/hooks/use-permission'
import { hasAnyPermission } from '@/shared/utils'

export type SidebarLinkGroup = {
	groupName?: string
	permissions?: string[]
	links: {
		href: string
		name: string
		icon: React.ReactNode
		permission?: string
	}[]
}

export type AppSidebarProps = {
	module: string
}

type Links = {
	module: string
	items: SidebarLinkGroup[]
	permissions?: string[]
}

const hrisLink: SidebarLinkGroup[] = [
	{
		links: [
			{
				href: paths.hris,
				icon: <House size={20} strokeWidth={2} />,
				name: 'Dashboard',
				permission: permissions.pages_hris_dashboard,
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
				permission: permissions.pages_hris_employee,
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
				permission: permissions.pages_hris_attendance,
			},
			{
				href: paths.hrisAttendanceOvertime,
				icon: <FileClock size={20} />,
				name: 'Lembur',
				permission: permissions.pages_hris_overtime,
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
				permission: permissions.pages_hris_cash_advance,
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
				permission: permissions.pages_hris_payroll,
			},
			{
				href: paths.hrisSalarySlip,
				icon: <FileBarChart size={20} />,
				name: 'Slip gaji',
				permission: permissions.pages_hris_slip_gaji,
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
				permission: permissions.pages_project_dashboard,
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
				permission: permissions.pages_project_list,
			},
			{
				href: paths.projectMasterdataClient,
				icon: <Users size={20} strokeWidth={2} />,
				name: 'Klien',
				permission: permissions.pages_project_client,
			},
			{
				href: paths.projectMasterdataClientCompany,
				icon: <Building size={20} strokeWidth={2} />,
				name: 'Perusahaan',
				permission: permissions.pages_project_client_company,
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
				permission: permissions.pages_inventory_dashboard,
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
				permission: permissions.pages_inventory_item,
			},
			{
				href: paths.inventoryMasterdataLocation,
				icon: <Warehouse size={20} strokeWidth={2} />,
				name: 'Gudang',
				permission: permissions.pages_inventory_warehouse,
			},
			{
				href: paths.inventoryMasterdataBrand,
				icon: <Tag size={20} strokeWidth={2} />,
				name: 'Merek',
				permission: permissions.pages_inventory_brand,
			},
			{
				href: paths.inventoryMasterdataSupplier,
				icon: <Store size={20} strokeWidth={2} />,
				name: 'Supplier',
				permission: permissions.pages_inventory_supplier,
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
				permission: permissions.pages_inventory_stock_in,
			},
			{
				href: paths.inventoryStockOut,
				icon: <PackageMinus size={20} strokeWidth={2} />,
				name: 'Stok keluar',
				permission: permissions.pages_inventory_stock_out,
			},
			{
				href: paths.inventoryStockLoan,
				icon: <Blocks size={20} strokeWidth={2} />,
				name: 'Peminjaman',
				permission: permissions.pages_inventory_stock_borrow,
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
				permission: permissions.pages_admin_user,
			},
			{
				href: paths.adminRole,
				icon: <Key size={20} strokeWidth={2} />,
				name: 'Role',
				permission: permissions.pages_admin_role,
			},
		],
	},
]

const allLink: Links[] = [
	{
		module: 'hris',
		items: hrisLink,
		permissions: [
			permissions.pages_hris_dashboard,
			permissions.pages_hris_employee,
			permissions.pages_hris_attendance,
			permissions.pages_hris_overtime,
			permissions.pages_hris_cash_advance,
			permissions.pages_hris_payroll,
			permissions.pages_hris_slip_gaji,
		],
	},
	{
		module: 'project',
		items: projectLink,
		permissions: [
			permissions.pages_project_dashboard,
			permissions.pages_project_list,
			permissions.pages_project_client,
			permissions.pages_project_client_company,
		],
	},
	{
		module: 'inventory',
		items: inventoryLink,
		permissions: [
			permissions.pages_inventory_dashboard,
			permissions.pages_inventory_item,
			permissions.pages_inventory_warehouse,
			permissions.pages_inventory_brand,
			permissions.pages_inventory_supplier,
			permissions.pages_inventory_stock_in,
			permissions.pages_inventory_stock_out,
			permissions.pages_inventory_stock_borrow,
		],
	},
	{
		module: 'admin',
		items: adminLink,
		permissions: [permissions.pages_admin_role, permissions.pages_admin_user],
	},
]

export default function AppSidebar({ module }: AppSidebarProps) {
	const { isMobile, toggleSidebar } = useSidebar()
	const menus = useActiveMenu()	
	const [activeMobileModule, setActiveMobileModule] = useState(module)
	const userPermissions = usePermission()

	const allModules = allLink.map((mod) => mod.module)

	const getModuleItems = (mod: string) =>
		allLink.find((m) => m.module === mod)?.items ?? []

	const renderSidebarItems = (items: SidebarLinkGroup[]) => (
		<SidebarGroup className='px-0 py-0'>
			{items.map((group, groupIdx) => {
				const visibleLinks = group.links.filter((link) =>
					link.permission ? userPermissions.includes(link.permission) : true
				)

				if (
					(group.permissions &&
						!hasAnyPermission(userPermissions, group.permissions)) ||
					visibleLinks.length === 0
				) {
					return null
				}

				return (
					<SidebarMenu key={groupIdx} className='mb-6'>
						{group.groupName && (
							<p className='text-sm w-full text-[#1E1E1E]/50 mb-4'>
								{group.groupName}
							</p>
						)}
						<SidebarMenuSubItem className='flex flex-col gap-4 w-full px-0'>
							{visibleLinks.map((link, index) => (
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
				)
			})}
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
								{allLink
									.filter((mod) => {
										if (!mod.permissions) return true
										return hasAnyPermission(userPermissions, mod.permissions)
									})
									.map((mod) => (
										<TabsTrigger
											key={mod.module}
											value={mod.module}
											className={cn(
												'flex-1 capitalize rounded-none font-medium py-3 relative',
												'data-[state=active]:bg-white data-[state=inactive]:bg-transparent',
												'data-[state=inactive]:hover:bg-gray-200',
												'data-[state=active]:text-ink-primary',
												'data-[state=active]:before:bg-brand data-[state=active]:before:absolute data-[state=active]:before:w-full data-[state=active]:before:h-1 data-[state=active]:before:bottom-0'
											)}
										>
											{mod.module === 'hris' ? 'HRIS' : mod.module}
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

import { Link } from 'react-router-dom'
import React from 'react'
import {
	BlocksIcon,
	ChevronDown,
	ChevronLeft,
	HardHat,
	House,
	UserCircle,
	Users,
} from 'lucide-react'

import usePermission from '@/shared/hooks/use-permission'
import { PATH } from '@/utils/constant/_paths'
import { cn } from '@/utils/cn'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar,
} from '@/components/ui/sidebar'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'

import Logo from '/public/logo2.svg'

import { useActiveMenu } from '@/shared/hooks/use-active-menu'

export default function AppSidebar() {
	const permission = usePermission()
	const menus = useActiveMenu()

	const { isMobile, toggleSidebar } = useSidebar()

	const isAllowedAccess = ['user:read', 'role:read'].some((item) =>
		permission.includes(item)
	)

	return (
		<Sidebar variant='sidebar' className='z-20'>
			<SidebarHeader>
				{isMobile && (
					<Button
						className='h-8 p-0.5 pl-2 pr-3 mb-2 inline-flex w-fit gap-1.5 bg-gray-200'
						variant='secondary'
						onClick={toggleSidebar}
					>
						<ChevronLeft className='h-4 w-4 text-dark' />
						Tutup
					</Button>
				)}
				<div className='rounded-lg w-full flex gap-2 items-center'>
					<div className='border px-1 py-1 border-gray-200 bg-white rounded-lg shadow-md shadow-gray-400/30'>
						<img src={Logo} className='h-6 w-6 rounded' />
					</div>
					<p className='text-dark font-medium text-sm'>ERP BJS</p>
				</div>
			</SidebarHeader>
			<ScrollArea>
				<SidebarContent>
					<SidebarGroup>
						<SidebarMenu>
							<SidebarMenuButton isActive={menus.path === '/dashboard'} asChild>
								<Link to='/dashboard'>
									<House size={20} />
									<span>Dashboard</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenu>

						<SidebarMenu>
							<SidebarMenuButton className='hover:bg-transparent cursor-default'>
								<Users size={20} />
								HRIS
							</SidebarMenuButton>
							<SidebarMenuSub>
								<SidebarMenuSubItem className='flex-col gap-1 flex'>
									{hrisMenus.map((item) => (
										<SidebarMenuSubButton
											isActive={menus.path === item.url}
											key={`submenu-${item.url}`}
											className={cn(
												'py-4 px-0',
												menus.path === item.url
													? 'before:absolute before:w-[calc(100%+16px)] before:h-full before:bg-white before:-left-4 before:rounded-md before:-z-[1] before:shadow-md before:shadow-gray-200/80'
													: 'relative px-0 hover:before:absolute hover:before:w-4 hover:before:h-full hover:before:bg-white hover:before:-left-4 hover:before:rounded-l-md'
											)}
											asChild
										>
											<Link to={item.url} className='relative'>
												{menus.path === item.url && (
													<div className='absolute top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-blue-primary -left-2.5'></div>
												)}
												<span>{item.title}</span>
											</Link>
										</SidebarMenuSubButton>
									))}
								</SidebarMenuSubItem>
							</SidebarMenuSub>
						</SidebarMenu>

						<SidebarMenu>
							<SidebarMenuButton className='hover:bg-transparent cursor-default'>
								<HardHat size={20} />
								Proyek
							</SidebarMenuButton>
							<SidebarMenuSub>
								<SidebarMenuSubItem className='flex flex-col gap-1'>
									{ProjectMenus.map((item) => (
										<SidebarMenuSubButton
											key={`submenu-${item.url}`}
											isActive={menus.path === item.url}
											className={cn(
												'py-4 px-0',
												menus.path === item.url
													? 'before:absolute before:w-[calc(100%+16px)] before:h-full before:bg-white before:-left-4 before:rounded-md before:-z-[1] before:shadow-md before:shadow-gray-200/80'
													: 'relative px-0 hover:before:absolute hover:before:w-4 hover:before:h-full hover:before:bg-white hover:before:-left-4 hover:before:rounded-l-md'
											)}
											asChild
										>
											<Link to={item.url}>
												{menus.path === item.url && (
													<div className='absolute top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-blue-primary -left-2.5'></div>
												)}
												<span>{item.title}</span>
											</Link>
										</SidebarMenuSubButton>
									))}
								</SidebarMenuSubItem>
							</SidebarMenuSub>
						</SidebarMenu>

						<SidebarMenu>
							<SidebarMenuButton className='hover:bg-transparent cursor-default'>
								<BlocksIcon size={20} />
								Inventory
							</SidebarMenuButton>
							<SidebarMenuSub>
								<SidebarMenuSubItem className='flex flex-col gap-1'>
									{InventoryMenus.map((item) => {
										if (item.children) {
											return (
												<Collapsible
													key={`submenu-${item.url}`}
													className='group/collapsible'
													defaultOpen={
														menus.activeSubMenu === 'Kelola' &&
														menus.activeMenu === 'inventory'
													}
												>
													<CollapsibleTrigger asChild>
														<SidebarMenuSubButton
															className={cn(
																'flex justify-between items-center relative px-0 hover:before:absolute hover:before:w-4 hover:before:h-full hover:before:bg-white hover:before:-left-4 hover:before:rounded-l-md pr-2'
															)}
														>
															<span>{item.title}</span>
															<ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
														</SidebarMenuSubButton>
													</CollapsibleTrigger>

													<CollapsibleContent>
														<SidebarMenuSub>
															{item.children?.map((sub) => (
																<SidebarMenuSubItem key={`submenu-${sub.url}`}>
																	<SidebarMenuSubButton
																		isActive={menus.path === sub.url}
																		className={cn(
																			'py-4 px-0',
																			menus.path === sub.url
																				? 'before:absolute before:w-[calc(100%+16px)] before:h-full before:bg-white before:-left-4 before:rounded-md before:-z-[1] before:shadow-md before:shadow-gray-200/80'
																				: 'relative px-0 hover:before:absolute hover:before:w-4 hover:before:h-full hover:before:bg-white hover:before:-left-4 hover:before:rounded-l-md'
																		)}
																		asChild
																	>
																		<Link to={sub.url}>
																			{menus.path === sub.url && (
																				<div className='absolute top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-blue-primary -left-2.5'></div>
																			)}
																			<span>{sub.title}</span>
																		</Link>
																	</SidebarMenuSubButton>
																</SidebarMenuSubItem>
															))}
														</SidebarMenuSub>
													</CollapsibleContent>
												</Collapsible>
											)
										}

										return (
											<React.Fragment key={`submenu-${item.url}`}>
												<SidebarMenuSubButton
													isActive={menus.path === item.url}
													className={cn(
														'py-4 px-0',
														menus.path === item.url
															? 'before:absolute before:w-[calc(100%+16px)] before:h-full before:bg-white before:-left-4 before:rounded-md before:-z-[1] before:shadow-md before:shadow-gray-200/80'
															: 'relative px-0 hover:before:absolute hover:before:w-4 hover:before:h-full hover:before:bg-white hover:before:-left-4 hover:before:rounded-l-md'
													)}
													asChild
												>
													<Link to={item.url}>
														{menus.path === item.url && (
															<div className='absolute top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-blue-primary -left-2.5'></div>
														)}
														<span>{item.title}</span>
													</Link>
												</SidebarMenuSubButton>
											</React.Fragment>
										)
									})}
								</SidebarMenuSubItem>
							</SidebarMenuSub>
						</SidebarMenu>

						<SidebarMenu>
							<SidebarMenuButton className='hover:bg-transparent cursor-default'>
								<UserCircle size={20} />
								Admin
							</SidebarMenuButton>
							<SidebarMenuSub>
								<SidebarMenuSubItem className='flex flex-col gap-1'>
									{permission.includes('user:read') && (
										<SidebarMenuSubButton
											key={`submenu-${AdminMenus[0].url}`}
											isActive={menus.path === AdminMenus[0].url}
											className={cn(
												'py-4 px-0',
												menus.path === AdminMenus[0].url
													? 'before:absolute before:w-[calc(100%+16px)] before:h-full before:bg-white before:-left-4 before:rounded-md before:-z-[1] before:shadow-md before:shadow-gray-200/80'
													: 'relative px-0 hover:before:absolute hover:before:w-4 hover:before:h-full hover:before:bg-white hover:before:-left-4 hover:before:rounded-l-md'
											)}
											asChild
										>
											<Link to={AdminMenus[0].url}>
												{menus.path === AdminMenus[0].url && (
													<div className='absolute top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-blue-primary -left-2.5'></div>
												)}
												<span>{AdminMenus[0].title}</span>
											</Link>
										</SidebarMenuSubButton>
									)}
									{permission.includes('role:read') && (
										<SidebarMenuSubButton
											key={`submenu-${AdminMenus[1].url}`}
											isActive={menus.path === AdminMenus[1].url}
											className={cn(
												'py-4 px-0',
												menus.path === AdminMenus[1].url
													? 'before:absolute before:w-[calc(100%+16px)] before:h-full before:bg-white before:-left-4 before:rounded-md before:-z-[1] before:shadow-md before:shadow-gray-200/80'
													: 'relative px-0 hover:before:absolute hover:before:w-4 hover:before:h-full hover:before:bg-white hover:before:-left-4 hover:before:rounded-l-md'
											)}
											asChild
										>
											<Link to={AdminMenus[1].url}>
												{menus.path === AdminMenus[1].url && (
													<div className='absolute top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-blue-primary -left-2.5'></div>
												)}
												<span>{AdminMenus[1].title}</span>
											</Link>
										</SidebarMenuSubButton>
									)}
								</SidebarMenuSubItem>
							</SidebarMenuSub>
						</SidebarMenu>
						{/* {isAllowedAccess && ( */}
						{/* )} */}
					</SidebarGroup>
				</SidebarContent>
			</ScrollArea>
		</Sidebar>
	)
}

const hrisMenus = [
	{
		title: 'Pegawai',
		url: PATH.EMPLOYEE,
	},
	{
		title: 'Absensi',
		url: PATH.EMPLOYEE_ATTENDANCE,
	},
	{
		title: 'Kasbon',
		url: PATH.EMPLOYEE_CASH_ADVANCES,
	},
	{
		title: 'Rekapan',
		url: PATH.EMPLOYEE_RECAP,
	},
]
const ProjectMenus = [
	{
		title: 'Dashboard',
		url: PATH.PROJECT_INDEX,
	},
	{
		title: 'Kelola',
		url: PATH.PROJECT_MANAGE,
	},
	{
		title: 'Klien',
		url: PATH.PROJECT_CLIENT,
	},
]
const InventoryMenus = [
	{
		title: 'Dashboard',
		url: PATH.INVENTORY_INDEX,
	},
	{
		title: 'Kelola',
		url: PATH.INVENTORY_STOCK,
		children: [
			{
				title: 'Barang Masuk',
				url: PATH.INVENTORY_STOCK_IN,
			},
			{
				title: 'Barang Keluar',
				url: PATH.INVENTORY_STOCK_OUT,
			},
			{
				title: 'Opname',
				url: PATH.INVENTORY_STOCK_OPNAME,
			},
			{
				title: 'Peminjaman',
				url: PATH.INVENTORY_STOCK_BORROWED,
			},
		],
	},
	{
		title: 'Supplier',
		url: PATH.INVENTORY_SUPPLIER,
	},
]
const AdminMenus = [
	{
		title: 'User',
		url: PATH.ADMIN_USER,
	},
	{
		title: 'Role',
		url: PATH.ADMIN_ROLE,
	},
]

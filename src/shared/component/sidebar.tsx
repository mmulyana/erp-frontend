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
import { paths } from '@/shared/utils/constant/_paths'
import { cn } from '@/shared/utils/cn'

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

export type SidebarLinkGroup = {
	groupName?: string
	links: {
		href: string
		name: string
		icon: React.ReactNode
	}[]
}

export type AppSidebarProps = {
	items: SidebarLinkGroup[]
}

export default function AppSidebar({ items }: AppSidebarProps) {
	const { isMobile, toggleSidebar } = useSidebar()
	const menus = useActiveMenu()

	return (
		<Sidebar variant='sidebar' className='z-0 pt-12'>
			<SidebarHeader className='block md:hidden'>
				{isMobile && (
					<Button
						className='h-8 p-0.5 pl-2 pr-3 mb-2 inline-flex w-fit gap-1.5 bg-[#F7F7F7]'
						variant='secondary'
						onClick={toggleSidebar}
					>
						<ChevronLeft className='h-4 w-4 text-dark' />
						Tutup
					</Button>
				)}
			</SidebarHeader>

			<ScrollArea className='px-6 pt-6'>
				<SidebarContent>
					<SidebarGroup className='px-0 py-0'>
						{items.map((group, groupIdx) => (
							<SidebarMenu key={groupIdx} className='mb-6'>
								{group.groupName && (
									<p className='text-sm w-full text-[#1E1E1E]/50 mb-4'>
										{group.groupName}
									</p>
								)}
								<SidebarMenuSubItem className='flex flex-col gap-4 w-full px-0'>
									{group.links.map((link) => (
										<SidebarMenuSubButton
											key={link.href}
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
														'flex items-center gap-2.5 text-[#BCBDC7]',
														menus.path === link.href && 'text-brand'
													)}
												>
													{link.icon}
													<span
														className={cn(
															'text-base text-[#828599]',
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
				</SidebarContent>
			</ScrollArea>
		</Sidebar>
	)
}

import { ChevronsUpDown, Power, Search, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAtomValue } from 'jotai'

import { CookieKeys, CookieStorage } from '@/shared/utils/cookie'
import { SidebarTrigger } from '@/shared/components/ui/sidebar'
import { Button } from '@/shared/components/ui/button'
import { userAtom } from '@/shared/store/auth'
import { cn } from '@/shared/utils/cn'

import { useIsMobile } from '../../hooks/use-mobile'
import TopNavigation from './top-navigation'
import PhotoUrl from './photo-url'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { paths } from '@/shared/constants/paths'
import { CommandSearch } from '@/features/command/components/command-search'

export default function Header() {
	const user = useAtomValue(userAtom)
	const navigate = useNavigate()

	const onLogout = () => {
		CookieStorage.remove(CookieKeys.AuthToken)
		navigate('/', {
			replace: true,
		})
	}

	const isMobile = useIsMobile()

	return (
		<div
			className={cn(
				'flex items-center justify-between border-b border-border px-4 h-[68px] bg-white fixed top-0 left-0 w-full z-50'
			)}
		>
			<div className='flex gap-2 md:gap-8 items-center'>
				{isMobile && <SidebarTrigger />}
				<div className='flex gap-2 items-center'>
					<img src='/images/logo.png' className='w-8 h-8' />
					<div className='gap-1 items-center hidden md:flex'>
						<p className='font-medium text-[#2D2F36]'>Barokah</p>
						<span className='rounded-md px-1 py-0.5 bg-brand flex items-center justify-center text-xs text-white'>
							ERP
						</span>
					</div>
				</div>
				{!isMobile && <TopNavigation />}
			</div>

			<div className='flex gap-6 items-center'>
				<CommandSearch />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='flex gap-2 items-center px-0 hover:bg-transparent'
						>
							<PhotoUrl
								url={user?.photoUrl || ''}
								style={{ img: 'h-8 w-8 rounded-full', icon: 'h-[18px]' }}
							/>
							<div className='space-y-[3px]'>
								<p className='text-sm text-ink-primary leading-none font-medium text-left'>
									{user?.username}
								</p>
								<p className='text-[13px] text-ink-primary/50 leading-none text-left'>
									{user?.role?.name}
								</p>
							</div>
							<ChevronsUpDown size={18} className='stroke-ink-primary/40' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='w-56'>
						<DropdownMenuLabel>Akun saya</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem
								className='flex gap-2'
								onClick={() => navigate(paths.account)}
							>
								<User size={18} />
								Akun
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem className='flex gap-2' onClick={onLogout}>
							<Power size={18} />
							Keluar
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}

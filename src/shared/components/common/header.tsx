import { ChevronDown, ChevronsUpDown } from 'lucide-react'
import { useAtomValue } from 'jotai'

import { SidebarTrigger } from '@/shared/components/ui/sidebar'
import { Button } from '@/shared/components/ui/button'
import { baseUrl } from '@/shared/constants/urls'
import { userAtom } from '@/shared/store/auth'
import { cn } from '@/shared/utils/cn'

import logo from '/public/images/logo.png'

import { useIsMobile } from '../../hooks/use-mobile'
import TopNavigation from './top-navigation'
import PhotoUrl from './photo-url'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import SearchAction from './search-action'

export default function Header() {
	const user = useAtomValue(userAtom)

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
					<img src={logo} className='w-8 h-8' />
					<div className='flex gap-1 items-center'>
						<p className='font-medium text-[#2D2F36]'>Barokah</p>
						<span className='rounded-md px-1 py-0.5 bg-brand flex items-center justify-center text-xs text-white'>
							ERP
						</span>
					</div>
				</div>
				{!isMobile && <TopNavigation />}
			</div>

			<div className='flex gap-6 items-center'>
				<SearchAction />
				<Popover>
					<PopoverTrigger>
						<Button
							variant='ghost'
							className='flex gap-2 items-center px-0 hover:bg-transparent'
						>
							<PhotoUrl
								url={user?.photoUrl || ''}
								style={{ img: 'h-8 w-8 rounded-full', icon: 'h-[18px]' }}
							/>
							<div className=''>
								<p className='text-sm text-ink-primary leading-none font-medium'>
									{user?.username}
								</p>
								<p className='text-xs text-ink-primary/50 leading-none'>
									{user?.role.name}
								</p>
							</div>
							<ChevronsUpDown size={18} className='stroke-ink-primary/40' />
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<p>Test</p>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	)
}

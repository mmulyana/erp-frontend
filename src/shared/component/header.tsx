import { ChevronDown } from 'lucide-react'
import { useAtomValue } from 'jotai'

import { baseUrl } from '@/shared/constants/_urls'
import { Button } from '@/components/ui/button'
import { userAtom } from '@/shared/store/auth'
import { cn } from '@/shared/utils/cn'

import logo from '/public/images/logo.png'

import TopNavigation from './top-navigation'
import { useIsMobile } from '../hooks/use-mobile'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default function Header() {
	const user = useAtomValue(userAtom)

	const isMobile = useIsMobile()

	return (
		<div
			className={cn(
				'flex items-center justify-between border-b border-[#EFF0F2] px-4 h-16 md:h-12 bg-white fixed top-0 left-0 w-full z-10'
			)}
		>
			<div className='flex gap-8 items-center'>
				<div className='flex gap-2 items-center'>
					<img src={logo} className='w-8 h-8' />
					<div className='flex gap-1 items-center'>
						<p className='font-medium text-[#2D2F36]'>Barokah</p>
						<span className='rounded-md px-1 py-0.5 bg-brand flex items-center justify-center text-xs text-white'>
							ERP
						</span>
					</div>
				</div>
				{!isMobile ? <TopNavigation /> : <SidebarTrigger />}
			</div>

			<div className='flex gap-2 items-center'>
				<Button
					variant='secondary'
					className='w-10 h-10 md:w-8 md:h-8 rounded-full bg-[#FFF] border-[1.5px] border-[#2A9D90] p-0.5 relative'
				>
					{user?.photoUrl ? (
						<img
							src={baseUrl + '/upload/' + user?.photoUrl}
							className='h-full w-full rounded-full object-cover'
						/>
					) : (
						<div className='w-full h-full rounded-full bg-brand/20 flex justify-center items-center pb-0.5'>
							<p className='text-sm uppercase text-brand'>
								{user?.username.at(0)}
							</p>
						</div>
					)}
				</Button>
				<ChevronDown size={20} />
			</div>
		</div>
	)
}

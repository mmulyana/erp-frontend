import { Link } from 'react-router-dom'

import { Button } from '../components/ui/button'
import { cn } from '../utils/cn'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../components/ui/tooltip'
import { ChevronRight } from 'lucide-react'
import { useIsMobile } from '../hooks/use-mobile'

type Props = {
	children: React.ReactNode
	links: Link[]
	action?: () => void
	titleAction?: string
	style?: {
		action?: string
		header?: string
	}
	buttonAction?: React.ReactNode
}

export type Link = {
	icon?: React.ReactNode
	name: string
	path: string
	hideName?: boolean
}

export default function DetailLayout({
	children,
	links,
	action,
	style,
	titleAction,
	buttonAction,
}: Props) {
	const isMobile = useIsMobile()
	return (
		<>
			<div className='px-6 h-16 w-full bg-white fixed top-0 left-0 flex justify-between items-center z-50'>
				<div
					className={cn(
						'w-[800px] max-w-full mx-auto flex justify-between items-center',
						style?.header
					)}
				>
					<div className='flex'>
						{links.map((link, index) => {
							if (index === links.length - 1 && isMobile) return null
							return (
								<div key={index} className='flex items-center gap-1'>
									{link.hideName ? (
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Link to={link.path}>
														<Button variant='ghost' size='sm' className='p-2'>
															{link?.icon}
														</Button>
													</Link>
												</TooltipTrigger>
												<TooltipContent>
													<p>{link.name}</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									) : (
										<Link to={link.path}>
											<Button
												variant='ghost'
												size='sm'
												className={cn(
													'gap-2',
													index === links.length - 1 &&
														'text-brand hover:text-brand'
												)}
											>
												{link?.icon}
												{link.name}
											</Button>
										</Link>
									)}

									{index < links.length - 1 &&
										(!isMobile || index < links.length - 2) && (
											<ChevronRight size={16} className='text-ink-light' />
										)}
								</div>
							)
						})}
					</div>
					{buttonAction ||
						(titleAction && (
							<Button
								variant='secondary'
								onClick={action}
								className={cn('text-brand hover:bg-gray-200', style?.action)}
							>
								{titleAction}
							</Button>
						))}
				</div>
			</div>
			<main className='pt-16 flex-1 min-h-screen bg-surface'>{children}</main>
		</>
	)
}

import { HardHat, User } from 'lucide-react'

import SearchV3 from '@/shared/components/search-v3'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { format } from 'date-fns'

const projects = [
	{
		assignedAt: new Date(),
		title:
			'Brick wall WWTP 2 AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
		clientName: 'Bambang',
		status: {
			name: 'Sedang dikerjakan',
			color: '#475DEF',
		},
	},
	{
		assignedAt: new Date(),
		title: 'SPB line 3',
		clientName: 'Bambang',
		status: {
			name: 'Selesai',
			color: '#47AF97',
		},
	},
	{
		assignedAt: new Date(),
		title: 'Wall WWTP 1',
		clientName: 'Bambang',
		status: {
			name: 'Sedang dikerjakan',
			color: '#475DEF',
		},
	},
]

export default function EmployeeProject() {
	return (
		<>
			<div className='flex gap-2 items-center p-6'>
				<HardHat className='text-ink-secondary' />
				<p className='text-ink-secondary font-medium'>Proyek</p>
			</div>
			<div className='px-6 pb-4 flex justify-between items-center'>
				<div className='border-l border-border flex flex-col pl-2 justify-center'>
					<p className='text-ink-light text-sm'>Total Proyek</p>
					<p className='text-ink-primary font-medium'>90</p>
				</div>
				<div className='flex gap-4'>
					<SearchV3 />
				</div>
			</div>
			<ScrollArea className='px-6'>
				{projects.map((i, index) => (
					<div
						key={index}
						className='flex items-start gap-0 lg:gap-6 mb-6 relative flex-col lg:flex-row'
					>
						{index < projects.length - 1 && (
							<div className='absolute h-[calc(100%+20px)] border border-ink-light/40 border-dashed top-5 left-[5px]' />
						)}
						<div className='h-3 w-3 rounded-full border border-brand relative bg-white mt-2'></div>
						<div className='flex gap-6 items-start lg:items-center pl-6 lg:pl-6 flex-col lg:flex-row -mt-[19px] lg:mt-0' >
							<p className='text-ink-secondary'>
								{format(i.assignedAt, 'dd MMMM yyyy')}
							</p>
							<div className='space-y-2 pl-0 lg:pl-4'>
								<div className='flex gap-2 items-start lg:items-center flex-col lg:flex-row'>
									<p className='text-ink-primary font-medium max-w-[320px] text-left truncate'>
										{i.title}
									</p>
									<div
										className='px-2 py-0 rounded-2xl border relative overflow-hidden'
										style={{ borderColor: i.status.color }}
									>
										<span
											className='text-sm z-10'
											style={{ color: i.status.color }}
										>
											{i.status.name}
										</span>
										<div
											className='absolute left-0 top-0 w-full h-full opacity-20'
											style={{ background: i.status.color }}
										></div>
									</div>
								</div>
								<div className='flex gap-6 items-center pt-2 lg:pt-0'>
									<div className='flex gap-2 items-center'>
										<User className='text-ink-secondary' size={18} />
										<p className='text-ink-primary text-sm'>{i.clientName}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</ScrollArea>
		</>
	)
}

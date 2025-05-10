import { format } from 'date-fns'
import { useState } from 'react'
import {
	CalendarIcon,
	ChevronsUpDown,
	ClipboardList,
	Database,
} from 'lucide-react'

import { Calendar } from '@/shared/components/ui/calendar'
import CardV1 from '@/shared/components/common/card-v1'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'

export function TotalAttendance() {
	const [value, setValue] = useState<any>(new Date())

	return (
		<CardV1
			title='Absensi'
			icon={<ClipboardList size={20} className='stroke-ink-primary' />}
			style={{ card: 'h-fit' }}
			action={
				<>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={'outline'}
								className={cn(
									'w-fit h-8 text-left font-normal',
									!value && 'text-muted-foreground'
								)}
							>
								<CalendarIcon
									size={16}
									strokeWidth={2}
									className='stroke-ink-primary mr-1'
								/>
								{value ? format(value, 'dd/MM/yyyy') : <span>Pick a date</span>}
								<ChevronsUpDown
									size={18}
									className='stroke-ink-primary/40 ml-2'
								/>
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-auto p-0' align='start'>
							<Calendar
								mode='single'
								selected={value}
								onSelect={setValue}
								disabled={(date) => date > new Date()}
							/>
						</PopoverContent>
					</Popover>
				</>
			}
		>
			<div className='grid grid-cols-2 gap-4 pt-4'>
				<div className='h-fit border rounded-lg px-3.5 py-4'>
					<div className='flex gap-1 items-center'>
						<div className='h-4 w-1.5 rounded-lg bg-[#47AF97]'></div>
						<p className='text-ink-primary/80 text-sm'>Hadir</p>
					</div>
					<p className='mt-1 text-xl text-ink-primary font-medium'>32</p>
				</div>
				<div className='h-fit border rounded-lg px-3.5 py-4'>
					<div className='flex gap-1 items-center'>
						<div className='h-4 w-1.5 rounded-lg bg-[#D52B42]'></div>
						<p className='text-ink-primary/80 text-nowrap text-sm'>
							Tidak Hadir
						</p>
					</div>
					<p className='mt-1 text-xl text-ink-primary font-medium'>32</p>
				</div>
				<div className='h-fit border rounded-lg px-3.5 py-4'>
					<div className='flex gap-1 items-center'>
						<div className='h-4 w-1.5 rounded-lg bg-ink-primary/20'></div>
						<p className='text-ink-primary/80 text-nowrap text-sm'>
							Blm diabsen
						</p>
					</div>
					<p className='mt-1 text-xl text-ink-primary font-medium'>32</p>
				</div>
				<div className='h-fit border rounded-lg px-3.5 py-4'>
					<div className='h-6 w-6 rounded border flex justify-center items-center'>
						<Database size={16} className='stroke-ink-primary' />
					</div>
					<div className='flex items-end justify-between'>
						<p className='text-ink-primary/80 leading-none'>Total</p>
						<p className='text-ink-primary font-medium leading-none text-2xl'>
							96
						</p>
					</div>
				</div>
			</div>
		</CardV1>
	)
}

import { id } from 'date-fns/locale'
import { format } from 'date-fns'

import { Attendance, AttendanceType } from '@/shared/types/api'
import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'

export default function ModalSummaryRegular({ data }: { data?: Attendance[] }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='text-brand'>
					Lihat
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogHeader>
					<DialogTitle>Kehadiran</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div className='pt-4'>
					{data?.map((i) => {
						const isPresence = i.type === AttendanceType.PRESENCE
						return (
							<div key={i.id} className='flex justify-between items-center border-b py-1 mb-2'>
								<p className='text-ink-primary'>
									{format(new Date(i.date), 'PPP', { locale: id })}
								</p>
								<p className={isPresence ? 'text-success' : 'text-error'}>
									{isPresence ? 'Hadir' : 'Tdk Hadir'}
								</p>
							</div>
						)
					})}
				</div>
			</DialogContent>
		</Dialog>
	)
}

import { id } from 'date-fns/locale'
import { format } from 'date-fns'

import { Button } from '@/shared/components/ui/button'
import { Overtime } from '@/shared/types/api'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'

export default function ModalSummaryOvertime({ data }: { data?: Overtime[] }) {
	return (
		<Dialog modal>
			<DialogTrigger asChild>
				<Button variant='ghost' className='text-brand'>
					Lihat
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogHeader>
					<DialogTitle>Lemburan</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div className='pt-4'>
					{data?.map((i) => {
						return (
							<div
								key={i.id}
								className='flex justify-between items-center border-b py-1 mb-2'
							>
								<p className='text-ink-primary'>
									{format(new Date(i.date), 'PPP', { locale: id })}
								</p>
								<p className='text-ink-primary font-medium'>
									<span className='opacity-50 font-normal'>Jml jam:</span>{' '}
									{i.totalHour}
								</p>
							</div>
						)
					})}
				</div>
			</DialogContent>
		</Dialog>
	)
}

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Badge } from '@/shared/components/ui/badge'
import { format } from 'date-fns'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useCost } from '../../api/employees/use-cost'
import { Button } from '@/shared/components/ui/button'
import { formatThousands } from '@/shared/utils'
import PhotoUrl from '@/shared/components/common/photo-url'
import { paths } from '@/shared/constants/paths'

export const ModalCost = () => {
	const [open, setOpen] = useState(false)
	const { id } = useParams()

	const { data } = useCost({
		projectId: open ? id : '',
	})

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='secondary' className='gap-1 w-full h-10'>
					Lihat Estimasi Pengeluaran
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6 space-y-2'>
				<DialogHeader>
					<DialogTitle>Estimasi Pengeluaran</DialogTitle>
					<DialogDescription>
						Ini hanya estimasi jumlah hari dikali gaji per hari
					</DialogDescription>
				</DialogHeader>
				<div className='py-4'>
					<p className='text-ink-primary'>Total</p>
					<p className='text-lg font-medium'>
						Rp {formatThousands(data?.data?.totalCost)}
					</p>
				</div>
				<div className='space-y-4'>
					{data?.data?.data?.map((item) => (
						<div key={item.id} className='border p-4 rounded-lg'>
							<div className='flex justify-between items-start'>
								<div className='flex gap-2 items-center'>
									<PhotoUrl
										url={item.employee.photoUrl || ''}
										style={{ img: 'h-10 w-10' }}
									/>
									<div>
										<Link
											to={`${paths.hrisMasterdataEmployee}/${item.employee.id}`}
											className='font-medium'
										>
											{item.employee.fullname}
										</Link>
										<p className='text-sm text-ink-primary'>
											{item.employee.position || '-'}
										</p>
									</div>
								</div>
								<div className='space-y-2 max-w-[200px]'>
									<div className='text-sm text-ink-primary'>
										{format(new Date(item.startDate), 'dd MMM yyyy')} –{' '}
										{item.endDate
											? format(new Date(item.endDate), 'dd MMM yyyy')
											: 'Sekarang'}
									</div>
								</div>
							</div>
							<div className='flex justify-between items-center mt-4'>
								<div className='space-y-1'>
									<div className='flex gap-2'>
										<p className='text-ink-primary/50 w-[80px]'>Durasi</p>
										<p className='text-ink-primary'>{item.days} hari</p>
									</div>
									<div className='flex gap-2'>
										<p className='text-ink-primary/50 w-[80px]'>Gaji/hari</p>
										{item.employee.salary ? (
											<p>Rp {formatThousands(item.employee.salary)}</p>
										) : (
											<p className='text-sm text-ink-primary'>-</p>
										)}
									</div>
								</div>
								<div className='space-y-1'>
									<p className='text-ink-primary/50 w-[80px]'>Subtotal</p>
									<p>Rp {formatThousands(item.cost)}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}

import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerClose,
	DrawerFooter,
	DrawerTrigger,
} from '@/shared/components/ui/drawer'
import { format } from 'date-fns'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { useMemo, useState } from 'react'
import { usePayroll } from '../api/use-payroll'
import { id as ind } from 'date-fns/locale'
import { formatThousands } from '@/shared/utils'
import { Eye } from 'lucide-react'

export function DrawerSalarySlip({ id }: { id?: string }) {
	const [open, setOpen] = useState(false)

	const { data } = usePayroll({
		id: open ? id : '',
	})

	const totalSalary =
		data?.salary * data?.workDay +
		data?.overtimeSalary * data?.overtimeHour -
		data?.deduction

	const notes = useMemo(() => {
		if (!data) return []
		const [namesStr, amountsStr, typesStr, refsStr] = data?.note.split('|')
		let tmp = []

		if (namesStr && amountsStr && typesStr) {
			const names = namesStr.split(',')
			const amounts = amountsStr.split(',')
			const types = typesStr.split(',')
			const refs = refsStr ? refsStr.split(',') : []

			if (names.length === amounts.length && names.length === types.length) {
				names.forEach((name, index) => {
					tmp.push({
						name: name,
						amount: Number(amounts[index]),
						referenceId: refs[index] || undefined,
					})
				})
			}
		}

		return tmp
	}, [data])

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant='outline' className='gap-1'>
					<Eye size={16} />
					<span className='px-0.5'>Lihat Slip</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent className='max-w-full md:max-w-xl mx-auto px-6 pb-10'>
				<DrawerHeader>
					<DrawerTitle className='text-center'>Slip Gaji</DrawerTitle>
					<DrawerDescription className='text-center'>
						Detail gaji karyawan
					</DrawerDescription>
				</DrawerHeader>

				<div className='space-y-4 py-4'>
					<div>
						<p className='text-sm text-ink-primary/50'>Nama</p>
						<p className='font-medium'>{data?.employee.fullname}</p>
					</div>
					{data?.employee.position && (
						<div>
							<p className='text-sm text-ink-primary/50'>Posisi</p>
							<p className='font-medium'>{data?.employee.position}</p>
						</div>
					)}
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<p className='text-sm text-ink-primary/50'>Hari Kerja</p>
							<p>{data?.workDay} hari</p>
						</div>
						<div>
							<p className='text-sm text-ink-primary/50'>Jam Lembur</p>
							<p>{data?.overtimeHour} jam</p>
						</div>
						<div>
							<p className='text-sm text-ink-primary/50'>Gaji Pokok</p>
							<p>Rp {data?.salary.toLocaleString('id-ID')}</p>
						</div>
						<div>
							<p className='text-sm text-ink-primary/50'>Gaji Lembur</p>
							<p>Rp {data?.overtimeSalary.toLocaleString('id-ID')}</p>
						</div>
						<div>
							<p className='text-sm text-ink-primary/50'>Potongan</p>
							<p>Rp {data?.deduction.toLocaleString('id-ID')}</p>
						</div>
						<div>
							<p className='text-sm text-ink-primary/50'>Total Gaji</p>
							<p className='font-semibold text-green-600'>
								Rp {totalSalary.toLocaleString('id-ID')}
							</p>
						</div>
						<div>
							<p className='text-sm'>Tipe Pembayaran</p>
							<p className='lowercase'>{data?.paymentType ?? '-'}</p>
						</div>
					</div>
					{notes && (
						<div className='space-y-2'>
							<p className='text-sm text-ink-primary/50'>Catatan</p>
							<div className='space-y-2'>
								{notes.map((i, index) => (
									<div
										key={index}
										className='flex justify-between items-center'
									>
										<p className='text-ink-primary/80'>{i.name}</p>
										<p className='text-ink-primary font-medium'>
											Rp {formatThousands(i.amount)}
										</p>
									</div>
								))}
							</div>
						</div>
					)}
					<div>
						<p className='text-sm text-ink-primary/50'>Tanggal Dibuat</p>
						{data?.doneAt && (
							<p>
								{format(new Date(data?.doneAt), 'PPP', {
									locale: ind,
								})}
							</p>
						)}
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

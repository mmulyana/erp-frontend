import { usePDF } from 'react-to-pdf'
import { useRef, useMemo, useState } from 'react'
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
import { usePayroll } from '../api/use-payroll'
import { id as ind } from 'date-fns/locale'
import { delay, formatThousands } from '@/shared/utils'
import { Eye } from 'lucide-react'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { cn } from '@/shared/utils/cn'

export function DrawerSalarySlip({ id }: { id?: string }) {
	const [open, setOpen] = useState(false)
	const [printMode, setPrintMode] = useState(false)

	const { data } = usePayroll({ id: open ? id : '' })

	// Pastikan data ada sebelum melakukan perhitungan untuk menghindari error
	const totalSalary = useMemo(() => {
		if (!data) return 0
		return (
			data.salary * data.workDay +
			data.overtimeSalary * data.overtimeHour -
			data.deduction
		)
	}, [data])

	const notes = useMemo(() => {
		if (!data || !data.note) return []
		const [namesStr, amountsStr, typesStr, refsStr] = data.note.split('|')
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
						type: types[index],
						referenceId: refs[index] || undefined,
					})
				})
			}
		}
		return tmp
	}, [data])

	const { toPDF, targetRef } = usePDF({
		filename: `slip-${data?.employee.fullname || 'unknown'}-${format(
			new Date(),
			'yyyyMMdd_HHmmss'
		)}.pdf`,
		page: {
			format: 'B5',
		},
	})

	const handleDownloadPdf = async () => {
		if (!targetRef.current) return

		setPrintMode(true)
		await new Promise((resolve) => requestAnimationFrame(resolve))

		toPDF({
			page: {
				format: 'B5',
			},
		})

		await new Promise((resolve) => setTimeout(resolve, 50)) // Small delay
		setPrintMode(false)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant='outline' className='gap-1'>
					<Eye size={16} />
					<span className='px-0.5'>Lihat Slip</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent className='max-w-full md:max-w-xl mx-auto'>
				<DrawerHeader>
					<DrawerTitle className='text-center'>Slip Gaji</DrawerTitle>
					<DrawerDescription className='text-center'>
						Detail gaji karyawan
					</DrawerDescription>
				</DrawerHeader>

				<ScrollArea className='h-[400px] px-6'>
					<div ref={targetRef}>
						<div
							className={cn(
								'space-y-4 py-4 mx-auto',
								printMode && 'max-w-6xl p-6'
							)}
						>
							{printMode && (
								<div className='flex flex-col'>
									<p className='text-lg text-center mb-2'>Slip gaji</p>
									<p className='text-ink-primary/50'>Periode</p>
									<p className='text-ink-primary font-medium'>
										{data.period.name}
									</p>
								</div>
							)}
							<div>
								<p className='text-sm text-ink-primary/50'>Nama</p>
								<p>{data?.employee.fullname}</p>
							</div>
							{data?.employee.position && (
								<div>
									<p className='text-sm text-ink-primary/50'>Posisi</p>
									<p className='font-medium'>{data?.employee.position}</p>
								</div>
							)}
							<div className='flex flex-col gap-4'>
								<div className='flex justify-between items-center'>
									<p className='text-ink-primary/50'>Hari Kerja</p>
									<p>{data?.workDay} hari</p>
								</div>
								<div className='flex justify-between items-center'>
									<p className='text-ink-primary/50'>Jam Lembur</p>
									<p>{data?.overtimeHour} jam</p>
								</div>
								<div className='flex justify-between items-center'>
									<p className='text-ink-primary/50'>Gaji Pokok</p>
									<p>Rp {data?.salary?.toLocaleString('id-ID')}</p>
								</div>
								<div className='flex justify-between items-center'>
									<p className='text-ink-primary/50'>Gaji Lembur</p>
									<p>Rp {data?.overtimeSalary?.toLocaleString('id-ID')}</p>
								</div>
								<div className='flex justify-between items-center'>
									<p className='text-ink-primary/50'>Potongan</p>
									<p>Rp {data?.deduction?.toLocaleString('id-ID')}</p>
								</div>
							</div>
							{notes.length > 0 && (
								<div className='space-y-2 border p-3 rounded-xl'>
									<p className='text-sm text-ink-primary/50'>Catatan</p>
									<div className='space-y-2'>
										{notes.map((i, index) => {
											const isNumeric = i.type === 'numeric'
											return (
												<div
													key={index}
													className='flex justify-between items-center'
												>
													<p className='text-ink-primary'>{i.name}</p>
													<p>
														{isNumeric && 'Rp'} {formatThousands(i.amount)}{' '}
														{!isNumeric && '%'}
													</p>
												</div>
											)
										})}
									</div>
								</div>
							)}
							<div className='flex justify-between items-center'>
								<p className='text-ink-primary/50'>Tipe Pembayaran</p>
								<p className='lowercase'>{data?.paymentType ?? '-'}</p>
							</div>
							<div className='flex justify-between items-center'>
								<p className='text-ink-primary/50'>Total Gaji diterima</p>
								<p className='font-semibold text-xl'>
									Rp {totalSalary.toLocaleString('id-ID')}
								</p>
							</div>
						</div>
					</div>

					<Button
						className='mb-10 w-full py-2.5 h-fit'
						variant='outline'
						onClick={handleDownloadPdf}
					>
						Expor ke PDF
					</Button>
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	)
}

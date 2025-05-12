import CardV1 from '@/shared/components/common/card-v1'
import { ChartContainer } from '@/shared/components/ui/chart'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'
import { months } from '@/shared/constants/months'
import { formatThousands } from '@/shared/utils'
import { cn } from '@/shared/utils/cn'
import { BarChartIcon, TrendingDown, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from 'recharts'

export default function StockInTotal() {
	const barColors = ['#EAEAEB', '#EAEAEB', '#EAEAEB', '#47AF97']

	const [selectedMonth, setSelectedMonth] = useState<number | null>(
		new Date().getMonth()
	)

	return (
		<CardV1
			title='Total'
			icon={<BarChartIcon size={20} className='text-ink-primary' />}
			style={{ card: 'w-[384px] max-w-full' }}
			action={
				<Select
					value={String(selectedMonth) || '0'}
					onValueChange={(val) => setSelectedMonth(Number(val))}
				>
					<SelectTrigger className='w-[120px] h-8 rounded-lg'>
						<SelectValue placeholder='Pilih bulan' />
					</SelectTrigger>
					<SelectContent>
						{months.map((month) => (
							<SelectItem key={month.value} value={month.value.toString()}>
								{month.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			}
		>
			<div className='flex justify-between items-end mt-2'>
				<div>
					<div className='flex gap-1.5 items-center'>
						<div className='flex items-end gap-1'>
							<p className='text-ink-primary/50 text-lg'>Rp</p>
							<p className='text-2xl font-medium text-ink-primary'>
								{formatThousands(400000)}
							</p>
						</div>
						<div
							className={cn(
								'rounded-full flex text-xs px-1.5 py-0.5 gap-1',
								10 > 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
							)}
						>
							{10 > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
							<p>10%</p>
						</div>
					</div>
					<p className='text-sm text-ink-primary/50'>Dibanding bulan kemarin</p>
				</div>
				<ChartContainer config={{}} className='w-[64px] h-[56px]'>
					<BarChart data={[]} margin={{ bottom: 0, top: 0, left: 0, right: 0 }}>
						<XAxis dataKey='date' hide />

						<Bar dataKey='total' barSize={12} radius={[4, 4, 4, 4]}>
							{[].map((_, index) => (
								<Cell key={`cell-${index}`} fill={barColors[index]} />
							))}
						</Bar>
					</BarChart>
				</ChartContainer>
			</div>
		</CardV1>
	)
}

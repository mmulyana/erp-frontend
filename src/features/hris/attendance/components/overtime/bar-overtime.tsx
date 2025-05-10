import { CalendarIcon, ChevronsUpDown, FileClock } from 'lucide-react'
import { Calendar } from '@/shared/components/ui/calendar'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { useState } from 'react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	ResponsiveContainer,
	CartesianGrid,
} from 'recharts'

import CardV1 from '@/shared/components/common/card-v1'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartConfig,
} from '@/shared/components/ui/chart'
import { useReportChart } from '../../api/overtime/user-report-chart'

const chartData = [
	{ date: '2024-10-12', total: 30 },
	{ date: '2024-10-13', total: 45 },
	{ date: '2024-10-14', total: 45 },
	{ date: '2024-10-15', total: 55 },
	{ date: '2024-10-16', total: 30 },
	{ date: '2024-10-17', total: 55 },
]

const chartConfig = {
	total: {
		label: 'Total',
		color: '#47AF97',
	},
} satisfies ChartConfig

export default function BarOvertime() {
	const { data } = useReportChart()

	const [value, setValue] = useState<Date | undefined>(new Date())

	return (
		<CardV1
			title='Lembur'
			icon={<FileClock size={20} className='stroke-ink-primary' />}
			style={{ card: 'col-span-2 !h-fit' }}
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
								{value ? (
									format(value, 'dd/MM/yyyy')
								) : (
									<span>Pilih Tanggal</span>
								)}
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
			<ChartContainer config={chartConfig} className='h-[220px] w-full'>
				<div className='h-[220px]'>
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart
							data={data?.data || []}
							barGap={8}
							barCategoryGap={20}
							margin={{ top: 8, bottom: -8 }}
						>
							<CartesianGrid strokeDasharray='4 4' vertical={false} />

							<XAxis
								dataKey='date'
								tickLine={false}
								axisLine={false}
								tickFormatter={(value: string) => {
									const date = parseISO(value)
									return format(date, 'EEE', { locale: id })
								}}
								tickMargin={4}
							/>
							<XAxis
								dataKey='date'
								xAxisId='date'
								tickLine={false}
								axisLine={false}
								tickMargin={-8}
								tickFormatter={(value: string) => {
									const date = parseISO(value)
									return format(date, 'dd/MM/yyyy')
								}}
							/>
							<YAxis hide />
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent indicator='line' />}
							/>

							<Bar
								dataKey='total'
								fill='var(--color-total)'
								radius={[4, 4, 0, 0]}
								barSize={12}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</ChartContainer>
		</CardV1>
	)
}

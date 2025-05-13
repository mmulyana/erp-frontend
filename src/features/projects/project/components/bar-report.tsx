import { format, parseISO } from 'date-fns'
import { FileClock, Megaphone } from 'lucide-react'
import { id } from 'date-fns/locale'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	ResponsiveContainer,
	CartesianGrid,
} from 'recharts'

import CardV1 from '@/shared/components/common/card-v1'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartConfig,
} from '@/shared/components/ui/chart'
import DateRangePicker from '@/shared/components/common/date-range-picker'

const chartConfig = {
	total: {
		label: 'Total',
		color: '#5167F4',
	},
} satisfies ChartConfig

const chartData = [
	{ date: '2025-05-13', total: 40 },
	{ date: '2025-05-12', total: 10 },
	{ date: '2025-05-14', total: 20 },
	{ date: '2025-05-15', total: 20 },
]

export default function BarReport() {
	return (
		<CardV1
			title='Laporan'
			icon={<Megaphone size={20} className='stroke-ink-primary' />}
			style={{ card: 'col-span-2 !h-fit' }}
			action={<DateRangePicker />}
		>
			<ChartContainer config={chartConfig} className='h-[220px] w-full'>
				<div className='h-[220px]'>
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart
							data={chartData}
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

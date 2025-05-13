import { LineChartIcon } from 'lucide-react'
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
} from 'recharts'

import CardV1 from '@/shared/components/common/card-v1'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/shared/components/ui/chart'

const chartData = [
	{ date: '1 Okt', stock_in: 1, stock_out: 2, loan: 3 },
	{ date: '2 Okt', stock_in: 2, stock_out: 5, loan: 4 },
	{ date: '3 Okt', stock_in: 8, stock_out: 3, loan: 6 },
	{ date: '4 Okt', stock_in: 2, stock_out: 4, loan: 2 },
	{ date: '5 Okt', stock_in: 5, stock_out: 1, loan: 5 },
	{ date: '6 Okt', stock_in: 9, stock_out: 2, loan: 4 },
]

const chartConfig = {
	stock_in: {
		label: 'Stock In',
		color: '#47AF97',
	},
	stock_out: {
		label: 'Stock Out',
		color: '#D52B42',
	},
	loan: {
		label: 'Loan',
		color: '#EE682F',
	},
} satisfies ChartConfig

export function LineTransaction() {
	return (
		<CardV1
			title='Laporan'
			icon={<LineChartIcon size={20} className='text-ink-primary' />}
			style={{ content: 'pb-4' }}
		>
			<ChartContainer config={chartConfig} className='h-[280px] w-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{ left: 16, right: 16 }}
					>
						<CartesianGrid vertical={false} strokeDasharray='4 4' />
						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={12}
							interval={0}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel={false} />}
						/>
						<Line
							dataKey='stock_in'
							type='linear'
							stroke='var(--color-stock_in)'
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey='stock_out'
							type='linear'
							stroke='var(--color-stock_out)'
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey='loan'
							type='linear'
							stroke='var(--color-loan)'
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ResponsiveContainer>
			</ChartContainer>
		</CardV1>
	)
}

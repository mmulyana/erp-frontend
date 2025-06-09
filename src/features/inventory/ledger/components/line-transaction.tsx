import { LineChartIcon } from 'lucide-react'
import {
	AreaChart,
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
import { DateRange } from '@/shared/types'
import { useLedgerChart } from '../api/use-ledger-chart'

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

export function LineTransaction({ startDate, endDate }: DateRange) {
	const { data } = useLedgerChart({
		endDate: endDate?.toString(),
		startDate: startDate?.toString(),
	})
	return (
		<CardV1
			title='Laporan'
			icon={<LineChartIcon size={20} className='text-ink-primary' />}
			style={{ content: 'pb-4' }}
		>
			<ChartContainer config={chartConfig} className='max-h-[220px] w-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart
						accessibilityLayer
						data={data?.data}
						margin={{ left: 16, right: 16, top: 20 }}
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

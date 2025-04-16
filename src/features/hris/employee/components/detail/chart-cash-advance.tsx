import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardTitle } from '@/shared/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/shared/components/ui/chart'

const chartData = [
	{ month: 'January', total: 1860 },
	{ month: 'February', total: 3050 },
	{ month: 'March', total: 2370 },
	{ month: 'April', total: 730 },
	{ month: 'May', total: 2090 },
	{ month: 'June', total: 2140 },
]
const chartConfig = {} satisfies ChartConfig

export default function ChartCashAdvance() {
	return (
		<Card className='p-6 h-fit'>
			<CardTitle className='text-ink-secondary text-base'>
				Tren Kasbon per bulan
			</CardTitle>
			<CardContent className='p-0 pt-6'>
				<ChartContainer config={chartConfig} className='h-40 w-full'>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='dot' hideLabel />}
						/>
						<Area
							dataKey='total'
							type='linear'
							fill='transparent'
							fillOpacity={0.4}
							className='stroke-brand'
							strokeWidth={4}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}

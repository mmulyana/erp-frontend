import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

const chartData = [
	{ month: 'January', employee: 186 },
	{ month: 'February', employee: 305 },
	{ month: 'March', employee: 237 },
	{ month: 'April', employee: 73 },
	{ month: 'May', employee: 209 },
	{ month: 'June', employee: 214 },
]
const chartConfig = {
	employee: {
		label: 'Pegawai',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig

export default function TrenEmployee() {
	return (
		<Card className='col-span-2 p-6 h-fit'>
			<CardTitle className='text-ink-secondary text-base'>
				Tren Pegawai Baru per bulan
			</CardTitle>
			<CardContent className='p-0 pt-6'>
				<ChartContainer config={chartConfig} className='h-56 w-full'>
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
							dataKey='employee'
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

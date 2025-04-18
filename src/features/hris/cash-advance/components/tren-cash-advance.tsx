import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo } from 'react'

import { Card, CardContent, CardTitle } from '@/shared/components/ui/card'
import { useCurrentDate } from '@/shared/hooks/use-current-date'
import { useDateIndex } from '@/shared/hooks/use-date-index'
import { MONTHS_OBJ } from '@/shared/constants/months'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/shared/components/ui/chart'

import { useReportLastSixMonths } from '../api/use-report-last-six-months'

const chartConfig = {} satisfies ChartConfig

export default function TrenCashAdvances() {
	const { month } = useCurrentDate()

	const [query] = useQueryStates({
		date: parseAsInteger.withDefault(0),
		month: parseAsInteger.withDefault(month),
	})

	const { resultDate } = useDateIndex({
		indexDate: query.date > 0 ? query.date : new Date().getDate(),
		indexMonth: query.month,
	})
	const { data } = useReportLastSixMonths({
		startDate: resultDate.toString(),
	})
	const chartData = useMemo(() => {
		if (!data?.data) return []
		return data.data.chartData.map((item) => ({
			...item,
			month: MONTHS_OBJ[item.month],
		}))
	}, [data])

	return (
		<Card className='col-span-1 lg:col-span-2 p-6 h-fit'>
			<CardTitle className='text-ink-secondary text-base'>
				Tren total nominal kasbon per bulan
			</CardTitle>
			<CardContent className='p-0 pt-6'>
				<ChartContainer config={chartConfig} className='h-56 w-full'>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 16,
							right: 16,
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

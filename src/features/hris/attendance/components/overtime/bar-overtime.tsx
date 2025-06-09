import { format, parseISO } from 'date-fns'
import { FileClock } from 'lucide-react'
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
import { useReportChart } from '../../api/overtime/use-report-chart'

const chartConfig = {
	total: {
		label: 'Total',
		color: '#47AF97',
	},
} satisfies ChartConfig

type props = {
	startDate?: Date
	endDate?: Date
}
export default function BarOvertime({ startDate, endDate }: props) {
	const { data } = useReportChart({
		startDate: startDate?.toString(),
		endDate: endDate?.toString(),
	})

	return (
		<CardV1
			title='Lembur'
			icon={<FileClock size={20} className='stroke-ink-primary' />}
			style={{ card: 'col-span-2 !h-fit' }}
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

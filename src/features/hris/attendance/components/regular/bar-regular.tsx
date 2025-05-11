import { format, parseISO } from 'date-fns'
import { FilePen } from 'lucide-react'
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
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartConfig,
} from '@/shared/components/ui/chart'

import { useReportChart } from '../../api/regular/use-report-chart'

const chartConfig = {
	presence: {
		label: 'Hadir',
		color: '#475DEF',
	},
	absent: {
		label: 'Absen',
		color: '#D52B42',
	},
} satisfies ChartConfig

export default function BarRegular() {
	const { data } = useReportChart()
	const [value, setValue] = useState<Date | undefined>(new Date())

	return (
		<CardV1
			title='Absensi Reguler'
			icon={<FilePen size={20} className='stroke-ink-primary' />}
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
								dataKey='presence'
								fill='var(--color-presence)'
								radius={[4, 4, 0, 0]}
								barSize={12}
							/>
							<Bar
								dataKey='absent'
								fill='var(--color-absent)'
								radius={[4, 4, 0, 0]}
								barSize={12}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</ChartContainer>
			<div className='flex justify-center items-center flex-wrap gap-4'>
				{Object.entries(chartConfig).map(([key, config]) => (
					<div key={key} className='flex gap-1 items-center'>
						<div
							className='w-2 h-2 rounded-full'
							style={{ background: config.color }}
						></div>
						<span className='px-1 text-ink-primary/80 text-sm font-normal'>
							{config.label}
						</span>
					</div>
				))}
			</div>
		</CardV1>
	)
}

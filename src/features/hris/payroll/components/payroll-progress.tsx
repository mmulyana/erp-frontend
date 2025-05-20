import { Label, Pie, PieChart } from 'recharts'
import { GraduationCap, PieChartIcon } from 'lucide-react'
import { useMemo } from 'react'

import CardV1 from '@/shared/components/common/card-v1'
import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/utils/cn'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/shared/components/ui/chart'
import { useProgressPayroll } from '../api/use-progress-payroll'
import { useParams } from 'react-router-dom'

const chartData = [
	{
		name: 'Selesai',
		total: 4,
		fill: '#47AF97',
	},
	{
		name: 'Draft',
		total: 2,
		fill: '#EAEAEB',
	},
]
export default function PayrollProgress() {
	const { id } = useParams()
	const { data } = useProgressPayroll({ periodId: id })

	const total = useMemo(() => {
		return data?.data.reduce((acc, curr) => acc + curr.total, 0)
	}, [data])

	return (
		<CardV1
			title='Progress'
			icon={<PieChartIcon size={20} className='stroke-ink-primary' />}
			style={{
				card: 'h-fit w-full md:w-[302px] max-w-full',
				content:
					'flex items-center justify-start p-4 py-0 gap-4 w-[352px] relative h-[120px]',
			}}
		>
			<ChartContainer
				config={{} as ChartConfig}
				className='h-[132px] w-[132px] mx-0 -ml-4 absolute -mt-2'
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Pie
						data={data?.data}
						dataKey='total'
						nameKey='name'
						innerRadius={32}
						strokeWidth={5}
						paddingAngle={5}
						cornerRadius={3}
					>
						<Label
							content={({ viewBox }) => {
								if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
									return (
										<text
											x={viewBox.cx}
											y={viewBox.cy}
											textAnchor='middle'
											dominantBaseline='middle'
										>
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy || 0) - 8}
												className='fill-muted-foreground text-sm'
											>
												Total
											</tspan>
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy || 0) + 12}
												className={cn('fill-ink-primary font-bold text-xl')}
											>
												{total?.toLocaleString()}
											</tspan>
										</text>
									)
								}
							}}
						/>
					</Pie>
				</PieChart>
			</ChartContainer>
			<div className='flex gap-2 flex-wrap max-w-[140px] justify-start items-start ml-32 -mt-2'>
				{data?.data?.map((i, idx) => {
					if (i.name === 'Belum diisi') return null
					return (
						<Badge variant='outline' key={idx}>
							<div
								className='w-1.5 h-1.5 rounded-full'
								style={{ background: i.fill }}
							></div>
							<span className='px-1 text-ink-primary/80 text-sm font-normal capitalize'>
								{i.name}
							</span>
							<span className='block ml-1 text-sm font-medium text-ink-primary'>
								{i.total}
							</span>
						</Badge>
					)
				})}
			</div>
		</CardV1>
	)
}

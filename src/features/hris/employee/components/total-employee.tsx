import { Label, Pie, PieChart } from 'recharts'
import { Users } from 'lucide-react'
import { useMemo } from 'react'

import CardV1 from '@/shared/components/common/card-v1'
import { Badge } from '@/shared/components/ui/badge'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/shared/components/ui/chart'

import { useTotalEmployee } from '../api/use-total-employee'

export default function TotalEmployee() {
	const { data } = useTotalEmployee()

	const totalEmployees = useMemo(() => {
		return data?.data?.reduce((acc, curr) => acc + curr.total, 0)
	}, [data])

	return (
		<CardV1
			title='Pegawai'
			icon={<Users size={20} className='stroke-ink-primary' />}
			style={{ card: 'h-fit col-span-2 xl:col-span-1 w-full' }}
		>
			<ChartContainer
				config={{} as ChartConfig}
				className='mx-auto w-full h-[180px]'
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
						innerRadius={48}
						strokeWidth={5}
						paddingAngle={5}
						cornerRadius={6}
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
												y={(viewBox.cy || 0) - 12}
												className='fill-muted-foreground text-sm'
											>
												Total
											</tspan>
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy || 0) + 16}
												className='fill-ink-primary text-2xl font-bold'
											>
												{totalEmployees?.toLocaleString()}
											</tspan>
										</text>
									)
								}
							}}
						/>
					</Pie>
				</PieChart>
			</ChartContainer>
			<div className='flex justify-center gap-2 flex-wrap'>
				{data?.data?.map((i, idx) => (
					<Badge variant='outline' key={idx}>
						<div
							className='w-1.5 h-1.5 rounded-full'
							style={{ background: i.fill }}
						></div>
						<span className='px-1 text-ink-primary/80 text-sm font-normal'>
							{i.name}
						</span>
						<span className='block ml-1 text-sm font-medium text-ink-primary'>
							{i.total}
						</span>
					</Badge>
				))}
			</div>
		</CardV1>
	)
}

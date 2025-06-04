import { PieChartIcon } from 'lucide-react'
import { Pie, PieChart } from 'recharts'

import CardV1 from '@/shared/components/common/card-v1'
import { cn } from '@/shared/utils/cn'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/shared/components/ui/chart'
import { Badge } from '@/shared/components/ui/badge'
import { useStatusChart } from '../api/use-status-chart'

type props = {
	variant?: 'default' | 'compact'
}

export default function ItemAvailability({ variant = 'default' }: props) {
	const { data } = useStatusChart()
	return (
		<CardV1
			title='Ketersediaan Barang'
			icon={<PieChartIcon size={20} className='stroke-ink-primary' />}
			style={{
				card: cn(
					'h-fit col-span-2 xl:col-span-1 w-full',
					variant === 'compact' && 'h-fit w-fit'
				),
				content: cn(
					variant === 'compact' &&
						'flex items-center justify-start p-4 py-0 gap-4 min-w-[352px] relative h-[120px]'
				),
			}}
		>
			<ChartContainer
				config={{} as ChartConfig}
				className={cn(
					'mx-auto w-full h-[180px]',
					variant === 'compact' &&
						'h-[132px] w-[132px] mx-0 -ml-4 absolute -mt-2'
				)}
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Pie
						data={data?.data || []}
						dataKey='total'
						nameKey='name'
						innerRadius={variant === 'default' ? 48 : 32}
						strokeWidth={5}
						paddingAngle={5}
						cornerRadius={variant == 'default' ? 6 : 3}
					></Pie>
				</PieChart>
			</ChartContainer>
			<div
				className={cn(
					'flex justify-center gap-2 flex-wrap',
					variant === 'compact' &&
						'max-w-[180px] justify-start items-start ml-32 -mt-2'
				)}
			>
				{data?.data?.map((i, idx) => (
					<Badge
						variant='outline'
						key={idx}
						className={cn(variant === 'compact' && 'w-full border-none')}
					>
						<div
							className='w-1.5 h-1.5 rounded-full'
							style={{ background: i.fill }}
						></div>
						<span className='px-1 text-ink-primary/80 text-sm font-normal'>
							{i.name}
						</span>
						<span
							className={cn(
								'block ml-1 text-sm font-medium text-ink-primary',
								variant === 'compact' && 'ml-auto'
							)}
						>
							{i.total}
						</span>
					</Badge>
				))}
			</div>
		</CardV1>
	)
}

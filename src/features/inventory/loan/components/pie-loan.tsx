import { Pie, PieChart } from 'recharts'
import { PieChartIcon, Users } from 'lucide-react'

import CardV1 from '@/shared/components/common/card-v1'
import { cn } from '@/shared/utils/cn'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/shared/components/ui/chart'
import { Badge } from '@/shared/components/ui/badge'

const chartData = [
	{ name: 'Dikembalikan', total: 40, fill: '#475DEF' },
	{ name: 'Belum lengkap', total: 10, fill: '#D52B42' },
	{ name: 'Dipinjam', total: 4, fill: '#EE682F' },
]
export default function PieLoan() {
	return (
		<CardV1
			title='Status Peminjaman'
			icon={<PieChartIcon size={20} className='stroke-ink-primary' />}
			style={{
				card: cn('h-fit w-full'),
				content: cn(
					'flex items-center justify-start p-4 py-0 gap-4 relative h-[120px]'
				),
			}}
		>
			<ChartContainer
				config={{} as ChartConfig}
				className={cn('h-[132px] w-[132px] mx-0 -ml-4 absolute -mt-2')}
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Pie
						data={chartData}
						dataKey='total'
						nameKey='name'
						innerRadius={32}
						strokeWidth={5}
						paddingAngle={5}
						cornerRadius={3}
					></Pie>
				</PieChart>
			</ChartContainer>
			<div
				className={cn('justify-start items-start ml-32 -mt-2')}
			>
				{chartData.map((i, idx) => (
					<Badge variant='outline' className='w-full border-none' key={idx}>
						<div
							className='w-1.5 h-1.5 rounded-full'
							style={{ background: i.fill }}
						></div>
						<span className='px-1 text-ink-primary/80 text-sm font-normal'>
							{i.name}
						</span>
						<span className='block ml-auto text-sm font-medium text-ink-primary'>
							{i.total}
						</span>
					</Badge>
				))}
			</div>
		</CardV1>
	)
}

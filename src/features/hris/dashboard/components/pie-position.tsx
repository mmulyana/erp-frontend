import { Pie, PieChart } from 'recharts'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { cn } from '@/utils/cn'

const chartData = [
	{ name: 'Tukang', total: 275, fill: '#2B6FD5' },
	{ name: 'Supir', total: 200, fill: '#2BD5C0' },
	{ name: 'Helper', total: 187, fill: '#A52BD5' },
]

const totalEmployees = chartData.reduce((sum, item) => sum + item.total, 0)

export default function PiePosition() {
	return (
		<Card className='flex flex-col p-6'>
			<CardTitle className='text-ink-secondary text-base'>
				Posisi Pegawai
			</CardTitle>
			<CardContent className='flex-1 p-0 -mt-4'>
				<ChartContainer
					className='mx-auto aspect-square max-h-[250px]'
					config={{}}
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
							innerRadius={60}
							outerRadius={90}
							cornerRadius={6}
							paddingAngle={2}
							stroke='white'
							strokeWidth={2}
						/>
					</PieChart>
				</ChartContainer>

				<div className='flex justify-center gap-4 items-center'>
					{chartData.map(({ name, fill, total }) => {
						const percentage = ((total / totalEmployees) * 100).toFixed()
						return (
							<div
								key={name}
								className='flex items-center justify-between gap-2 text-sm'
							>
								<div className='flex gap-2 items-center'>
									<span
										className='inline-block h-3 w-3 rounded'
										style={{ backgroundColor: fill }}
									/>
									<p className='text-ink-secondary font-medium'>
										{name}{' '}
										<span className='text-ink-light'>({percentage}%)</span>
									</p>
								</div>
							</div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}

import { Pie, PieChart } from 'recharts'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

const chartData = [
	{ name: 'SD', total: 95, fill: '#2B5BD5' },
	{ name: 'SMP', total: 20, fill: '#D52B61' },
	{ name: 'SMA', total: 17, fill: '#E3D041' },
]

const totalEmployees = chartData.reduce((sum, item) => sum + item.total, 0)

export default function PieEducation() {
	return (
		<Card className='flex flex-col p-6'>
			<CardTitle className='text-ink-secondary text-base'>
				Pendidikan Terakhir Pegawai
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

				<div className='flex justify-center gap-4'>
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

import { Pie, PieChart } from 'recharts'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

const chartData = [
	{ age: '18-20', total: 275, fill: '#2B6FD5' },
	{ age: '21-30', total: 200, fill: '#2BD5C0' },
	{ age: '31-50', total: 187, fill: '#A52BD5' },
]

const totalEmployees = chartData.reduce((sum, item) => sum + item.total, 0)

export default function PieAge() {
	return (
		<Card className='flex flex-col p-6'>
			<CardTitle className='text-ink-secondary text-base'>
				Usia Pegawai
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
							nameKey='age'
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
					{chartData.map(({ age, fill, total }) => {
						const percentage = ((total / totalEmployees) * 100).toFixed()
						return (
							<div
								key={age}
								className='flex items-center justify-between gap-2 text-sm'
							>
								<div className='flex gap-2 items-center'>
									<span
										className='inline-block h-3 w-3 rounded'
										style={{ backgroundColor: fill }}
									/>
									<p className='text-ink-secondary font-medium'>
										{age}{' '}
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

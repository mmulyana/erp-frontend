import { BarChart, Bar, Cell, ResponsiveContainer, XAxis } from 'recharts'
import { BarChartIcon, TrendingUp } from 'lucide-react'

import { ChartContainer } from '@/shared/components/ui/chart'
import CardV1 from '@/shared/components/common/card-v1'

const data = [
	{ name: 'A', total: 8 },
	{ name: 'B', total: 6 },
	{ name: 'C', total: 4 },
	{ name: 'D', total: 20 },
]

export default function CashAdvanceTotal() {
	const barColors = ['#EAEAEB', '#EAEAEB', '#EAEAEB', '#475DEF']

	return (
		<CardV1
			title='Total kasbon'
			icon={<BarChartIcon size={20} className='text-ink-primary' />}
			style={{ card: 'w-[384px] max-w-full' }}
		>
			<div className='flex justify-between items-end mt-2'>
				<div>
					<div className='flex gap-1.5 items-center'>
						<div className='flex items-end gap-0.5'>
							<p className='text-ink-primary/50 text-lg font-medium'>Rp</p>
							<p className='text-2xl font-medium text-ink-primary'>320.000</p>
						</div>
						<div className='rounded-full flex text-xs px-1.5 py-0.5 bg-error/10 text-error'>
							<TrendingUp size={16} />
							<p>12%</p>
						</div>
					</div>
					<p className='text-sm text-ink-primary/50'>Dibanding hari kemarin</p>
				</div>
				<ChartContainer config={{}} className='w-[64px] h-[56px]'>
					<ResponsiveContainer width='100%' height='100%' className=''>
						<BarChart
							data={data}
							margin={{ bottom: 0, top: 0, left: 0, right: 0 }}
						>
							<XAxis dataKey='name' hide />

							<Bar dataKey='total' barSize={12} radius={[4, 4, 4, 4]}>
								{data.map((_, index) => (
									<Cell key={`cell-${index}`} fill={barColors[index]} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</ChartContainer>
			</div>
		</CardV1>
	)
}

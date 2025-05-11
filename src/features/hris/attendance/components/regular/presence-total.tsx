import CardV1 from '@/shared/components/common/card-v1'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/shared/components/ui/chart'
import { ClipboardCheck, TrendingUp } from 'lucide-react'
import {
	BarChart,
	Bar,
	Cell,
	ResponsiveContainer,
	XAxis,
	Tooltip,
} from 'recharts'

const data = [
	{ name: 'A', total: 8 },
	{ name: 'B', total: 6 },
	{ name: 'C', total: 4 },
	{ name: 'D', total: 20 },
]

export default function PresenceTotal() {
	const barColors = ['#EAEAEB', '#EAEAEB', '#EAEAEB', '#47AF97']

	return (
		<CardV1
			title='Hadir'
			icon={<ClipboardCheck size={20} className='text-success' />}
		>
			<div className='flex justify-between items-end mt-2'>
				<div>
					<div className='flex gap-1.5 items-center'>
						<p className='text-3xl font-medium text-ink-primary'>32</p>
						<div className='rounded-full flex text-xs px-1.5 py-0.5 bg-success/10 text-success'>
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

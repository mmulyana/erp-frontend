import { BarChart, Bar, Cell, ResponsiveContainer, XAxis } from 'recharts'
import { ClipboardX, TrendingDown, TrendingUp } from 'lucide-react'
import { parseAsTimestamp, useQueryStates } from 'nuqs'

import { ChartContainer } from '@/shared/components/ui/chart'
import CardV1 from '@/shared/components/common/card-v1'
import { cn } from '@/shared/utils/cn'

import { useReportByDate } from '../../api/regular/use-report-by-date'

export default function AbsentTotal() {
	const barColors = ['#EAEAEB', '#EAEAEB', '#EAEAEB', '#D52B42']

	const [query] = useQueryStates({
		date: parseAsTimestamp,
	})

	const date = new Date(query.date || Date.now())
	date.setHours(0, 0, 0, 0)
	const startDate = date.toString()

	const { data } = useReportByDate({ date: startDate })

	return (
		<CardV1
			title='Absen'
			icon={<ClipboardX size={20} className='text-error' />}
		>
			<div className='flex justify-between items-end mt-2'>
				<div>
					<div className='flex gap-1.5 items-center'>
						<p className='text-3xl font-medium text-ink-primary'>32</p>
						<div
							className={cn(
								'rounded-full flex text-xs px-1.5 py-0.5 gap-1',
								(data?.data?.absent?.percentage ?? 0) > 0
									? 'bg-success/10 text-success'
									: 'bg-error/10 text-error'
							)}
						>
							{(data?.data?.absent?.percentage || 0) > 0 ? (
								<TrendingUp size={16} />
							) : (
								<TrendingDown size={16} />
							)}
							<p>{data?.data?.absent.percentage}%</p>
						</div>
					</div>
					<p className='text-sm text-ink-primary/50'>Dibanding hari kemarin</p>
				</div>
				<ChartContainer config={{}} className='w-[64px] h-[56px]'>
					<ResponsiveContainer width='100%' height='100%' className=''>
						<BarChart
							data={data?.data?.absent.data || []}
							margin={{ bottom: 0, top: 0, left: 0, right: 0 }}
						>
							<XAxis dataKey='name' hide />

							<Bar dataKey='total' barSize={12} radius={[4, 4, 4, 4]}>
								{data?.data?.absent.data?.map((_, index) => (
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

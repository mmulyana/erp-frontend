'use client'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { Calendar } from '@/shared/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'
import { Button } from '@/shared/components/ui/button'
import { format, parseISO } from 'date-fns'
import {
	CalendarIcon,
	FileBarChart,
	ChevronsUpDown,
	FilePen,
} from 'lucide-react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
} from 'recharts'
import { useState } from 'react'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartConfig,
} from '@/shared/components/ui/chart'
import CardV1 from '@/shared/components/common/card-v1'
import { cn } from '@/shared/utils/cn'
import { id } from 'date-fns/locale'
import { Badge } from '@/shared/components/ui/badge'

const chartData = [
	{ date: '2024-10-12', presence: 30, absent: 45 },
	{ date: '2024-10-13', presence: 45, absent: 10 },
	{ date: '2024-10-14', presence: 45, absent: 10 },
	{ date: '2024-10-15', presence: 55, absent: 5 },
	{ date: '2024-10-16', presence: 30, absent: 45 },
	{ date: '2024-10-17', presence: 55, absent: 5 },
]

const chartConfig = {
	presence: {
		label: 'Hadir',
		color: '#475DEF',
	},
	absent: {
		label: 'Absen',
		color: '#D52B42',
	},
} satisfies ChartConfig

export default function BarRegular() {
	const [value, setValue] = useState<Date | undefined>(new Date())

	return (
		<CardV1
			title='Absensi Reguler'
			icon={<FilePen size={20} className='stroke-ink-primary' />}
			style={{ card: 'col-span-1 xl:col-span-2 !h-fit' }}
			action={
				<>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={'outline'}
								className={cn(
									'w-fit h-8 text-left font-normal',
									!value && 'text-muted-foreground'
								)}
							>
								<CalendarIcon
									size={16}
									strokeWidth={2}
									className='stroke-ink-primary mr-1'
								/>
								{value ? format(value, 'dd/MM/yyyy') : <span>Pilih Tggl</span>}
								<ChevronsUpDown
									size={18}
									className='stroke-ink-primary/40 ml-2'
								/>
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-auto p-0' align='start'>
							<Calendar
								mode='single'
								selected={value}
								onSelect={setValue}
								disabled={(date) => date > new Date()}
							/>
						</PopoverContent>
					</Popover>
				</>
			}
		>
			<ChartContainer config={chartConfig} className='h-[220px] w-full'>
				<div className='h-[220px]'>
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart
							data={chartData}
							barGap={8}
							barCategoryGap={20}
							margin={{ top: 8, bottom: -8 }}
						>
							<CartesianGrid strokeDasharray='4 4' vertical={false} />

							<XAxis
								dataKey='date'
								tickLine={false}
								axisLine={false}
								tickFormatter={(value: string) => {
									const date = parseISO(value)
									return format(date, 'EEE', { locale: id })
								}}
								tickMargin={4}
							/>
							<XAxis
								dataKey='date'
								xAxisId='date'
								tickLine={false}
								axisLine={false}
								tickMargin={-8}
								tickFormatter={(value: string) => {
									const date = parseISO(value)
									return format(date, 'dd/MM/yyyy')
								}}
							/>
							<YAxis hide />
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent indicator='line' />}
							/>
							<Bar
								dataKey='presence'
								fill='var(--color-presence)'
								radius={[4, 4, 0, 0]}
								barSize={12}
							/>
							<Bar
								dataKey='absent'
								fill='var(--color-absent)'
								radius={[4, 4, 0, 0]}
								barSize={12}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</ChartContainer>
			<div className='flex justify-center items-center flex-wrap gap-4'>
				{Object.entries(chartConfig).map(([key, config]) => (
					<div key={key} className='flex gap-1 items-center'>
						<div
							className='w-2 h-2 rounded-full'
							style={{ background: config.color }}
						></div>
						<span className='px-1 text-ink-primary/80 text-sm font-normal'>
							{config.label}
						</span>
					</div>
				))}
			</div>
		</CardV1>
	)
}

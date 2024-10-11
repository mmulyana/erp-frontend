import { Card, Cardbody, CardHead } from '@/components/common/card-v1'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Pie, PieChart } from 'recharts'

export const chartData2 = [
  { status: 'active', count: 42, fill: '#5463E8' },
  { status: 'nonactive', count: 8, fill: '#274754' },
]
export const chartConfig2 = {
  visitors: {
    label: 'Pegawai',
  },
  active: {
    label: 'Aktif',
    color: 'hsl(var(--chart-1))',
  },
  nonactive: {
    label: 'Tidak Aktif',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export default function CardStatusEmployee() {
  return (
    <Card>
      <CardHead>
        <p className='text-dark text-sm font-semibold'>Status pegawai</p>
      </CardHead>
      <Cardbody className='pt-0'>
        <ChartContainer
          config={chartConfig2}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData2}
              dataKey='count'
              nameKey='status'
              innerRadius={60}
              strokeWidth={5}
            ></Pie>
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </Cardbody>
    </Card>
  )
}

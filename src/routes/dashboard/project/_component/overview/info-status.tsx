import { Card, Cardbody, CardHead } from '@/components/common/card-v1'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartData = [
  { month: 'Januari', project: 18 },
  { month: 'Februari', project: 5 },
  { month: 'Maret', project: 7 },
  { month: 'April', project: 3 },
  { month: 'Mei', project: 20 },
  { month: 'Juni', project: 14 },
  { month: 'Juli', project: 24 },
  { month: 'Agustus', project: 4 },
  { month: 'September', project: 24 },
  { month: 'Oktober', project: 16 },
]
const chartConfig = {
  project: {
    label: 'Project',
    color: '#2A9D90',
  },
} satisfies ChartConfig

export default function InfoStatus() {
  return (
    <Card>
      <CardHead className='border-none'>
        <p className='text-sm text-dark'>Tren Proyek perbulan</p>
      </CardHead>
      <Cardbody>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 32,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey='project' fill='var(--color-project)' radius={8}>
              <LabelList
                position='top'
                offset={12}
                className='fill-foreground'
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </Cardbody>
    </Card>
  )
}

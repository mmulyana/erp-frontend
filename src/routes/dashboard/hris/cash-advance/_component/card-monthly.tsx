import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Card, CardBody, CardHead } from '@/components/common/card-v1'

const chartData = [
  { month: 'Januari', total: 186 },
  { month: 'Februari', total: 305 },
  { month: 'Maret', total: 237 },
  { month: 'April', total: 73 },
  { month: 'Mei', total: 209 },
  { month: 'Juni', total: 214 },
]
const chartConfig = {
  total: {
    label: 'Total',
    color: '#2A9D90',
  },
} satisfies ChartConfig

export default function CardMonthly() {
  return (
    <Card className='rounded-xl'>
      <CardHead>
        <p className='text-dark text-sm font-semibold'>
          Laporan kasbon bulanan
        </p>
      </CardHead>
      <CardBody>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
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
            <Bar dataKey='total' fill='var(--color-total)' radius={8} />
          </BarChart>
        </ChartContainer>
      </CardBody>
    </Card>
  )
}

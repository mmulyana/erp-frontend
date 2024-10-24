import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Card, Cardbody, CardHead } from '@/components/common/card-v1'

const chartData = [
  { month: 'January', total: 80 },
  { month: 'February', total: 200 },
  { month: 'March', total: 120 },
  { month: 'April', total: 190 },
  { month: 'May', total: 130 },
  { month: 'June', total: 140 },
]
const chartConfig = {
  expense: {
    label: 'expense',
    color: '#EA526B',
  },
} satisfies ChartConfig

export default function InfoExpense() {
  return (
    <Card>
      <CardHead className='border-none'>
        <p className='text-sm text-dark'>Estimasi pengeluaran bruto</p>
      </CardHead>
      <Cardbody>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 4,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id='fillExpense' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-expense)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-expense)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey='total'
              type='natural'
              fill='url(#fillExpense)'
              fillOpacity={0.4}
              stroke='var(--color-expense)'
            />
          </AreaChart>
        </ChartContainer>
      </Cardbody>
    </Card>
  )
}

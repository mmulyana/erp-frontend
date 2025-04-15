import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { TEST_ID } from '@/shared/constants/_testId'
import { useChartCashAdvance } from '@/hooks/api/use-chart'
import { useApiData } from '@/shared/hooks/use-api-data'

import { Card, CardBody, CardHead } from '@/components/common/card-v1'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export default function CardMonthly() {
  const { data } = useApiData(useChartCashAdvance({ total: 3 }))

  return (
    <Card
      className='rounded-xl'
      id={TEST_ID.REPORT_CASH_ADVANCE}
      data-testid={TEST_ID.REPORT_CASH_ADVANCE}
    >
      <CardHead>
        <p className='text-dark text-sm font-semibold'>
          Laporan kasbon bulanan
        </p>
      </CardHead>
      <CardBody>
        <ChartContainer config={(data?.chartConfig as ChartConfig) || {}}>
          <BarChart accessibilityLayer data={data?.chartData || []}>
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

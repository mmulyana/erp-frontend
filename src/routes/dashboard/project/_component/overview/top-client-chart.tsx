import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'
import { useChartTopClient } from '@/hooks/api/use-chart'
import { useApiData } from '@/shared/hooks/use-api-data'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Card, CardBody, CardHead } from '@/components/common/card-v1'
import LoadingState from '@/components/common/loading-state'

import { TEST_ID } from '@/shared/utils/constant/_testId'

export default function TopClientChart() {
  const { data } = useApiData(useChartTopClient())

  return (
    <Card id={TEST_ID.TOP_CLIENT} data-testid={TEST_ID.TOP_CLIENT}>
      <CardHead className='border-b border-line h-fit py-2 px-2'>
        <p className='text-sm text-dark'>Klien dengan proyek terbanyak</p>
      </CardHead>
      <CardBody className='p-2 h-48  relative'>
        {!data?.chartData || !data?.chartConfig ? (
          <LoadingState />
        ) : (
          <ChartContainer config={data.chartConfig} className='h-48 min-w-full'>
            <BarChart
              accessibilityLayer
              data={data.chartData}
              layout='vertical'
              margin={{
                right: 16,
                left: 12,
              }}
            >
              <YAxis
                dataKey='client'
                type='category'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                hide
              />
              <XAxis dataKey='count' type='number' hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator='line' />}
              />
              <Bar dataKey='count' layout='vertical' radius={4}>
                <LabelList
                  dataKey='client'
                  position='insideLeft'
                  offset={8}
                  className='fill-white'
                  fontSize={12}
                />
                <LabelList
                  dataKey='count'
                  position='right'
                  offset={8}
                  className='fill-dark'
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardBody>
    </Card>
  )
}

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useApiData } from '@/hooks/use-api-data'
import { useChartTopClient } from '@/hooks/api/use-chart'
import { Card, CardBody, CardHead } from '@/components/common/card-v1'

type ChartDataItem = {
  client: string
  count: number
  fill: string
}

export default function TopClientChart() {
  const { data } = useApiData(useChartTopClient())

  if (!data?.chartData || !data?.chartConfig) {
    return null
  }

  return (
    <Card>
      <CardHead className='border-b border-line h-fit py-2 px-2'>
        <p className='text-sm text-dark'>User dengan proyek terbanyak</p>
      </CardHead>
      <CardBody className='px-2 h-48 overflow-auto'>
        <ChartContainer
          config={(data?.chartConfig as ChartConfig) || {}}
          className='h-fit max-w-[160px] mx-auto aspect-square'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={data.chartData}
              margin={{
                top: 24,
              }}
            >
              <CartesianGrid
                vertical={false}
                stroke='var(--border)'
                strokeDasharray='4'
              />
              <XAxis
                dataKey='client'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) => (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    hideLabel
                  />
                )}
              />
              <Bar dataKey='count' radius={[8, 8, 0, 0]} maxBarSize={48}>
                {data.chartData.map((entry: ChartDataItem, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.fill ||
                      data.chartConfig[entry.client]?.color ||
                      'var(--primary)'
                    }
                  />
                ))}
                <LabelList
                  dataKey='count'
                  position='top'
                  offset={12}
                  className='fill-foreground'
                  fontSize={12}
                  formatter={(value: number) => value}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardBody>
    </Card>
  )
}

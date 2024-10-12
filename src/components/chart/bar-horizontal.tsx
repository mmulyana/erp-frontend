import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Card, Cardbody, CardHead } from '@/components/common/card-v1'

type Props = {
  title: string
  dataKeyX: string
  dataKeyBar: string
  config: ChartConfig
  data: any
}
export default function CardBarHorizontal({
  title,
  dataKeyX,
  dataKeyBar,
  config,
  data,
}: Props) {
  return (
    <Card className='rounded-xl'>
      <CardHead>
        <p className='text-dark text-sm font-semibold'>{title}</p>
      </CardHead>
      <Cardbody>
        <ChartContainer config={config}>
          <BarChart accessibilityLayer data={data} layout='vertical'>
            <XAxis type='number' dataKey={dataKeyBar} hide />
            <YAxis
              dataKey={dataKeyX}
              type='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey={dataKeyBar}
              fill={`var(--color-${dataKeyBar})`}
              radius={5}
            />
          </BarChart>
        </ChartContainer>
      </Cardbody>
    </Card>
  )
}

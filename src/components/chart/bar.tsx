import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
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
export default function CardBar({
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
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dataKeyX}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey={dataKeyBar}
              fill={`var(--color-${dataKeyBar})`}
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </Cardbody>
    </Card>
  )
}

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Card, CardBody, CardHead } from '@/components/common/card-v1'

type Props = {
  title: string
  dataKeyX: string
  dataKeyBar1: string
  dataKeyBar2: string
  config: ChartConfig
  data: any
}
export default function CardBarStacked({
  title,
  dataKeyX,
  dataKeyBar1,
  dataKeyBar2,
  config,
  data,
}: Props) {
  return (
    <Card className='rounded-xl'>
      <CardHead>
        <p className='text-dark text-sm font-semibold'>{title}</p>
      </CardHead>
      <CardBody>
        <ChartContainer config={config}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dataKeyX}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dashed' />}
            />
            <Bar
              dataKey={dataKeyBar1}
              fill={`var(--color-${dataKeyBar1})`}
              radius={4}
            />
            <Bar
              dataKey={dataKeyBar2}
              fill={`var(--color-${dataKeyBar2})`}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardBody>
    </Card>
  )
}

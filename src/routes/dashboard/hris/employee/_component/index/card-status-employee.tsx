import { Card, CardBody, CardHead } from '@/components/common/card-v1'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useChartEmployeeByStatus } from '@/hooks/api/use-chart'
import { Pie, PieChart } from 'recharts'

export default function CardStatusEmployee() {
  const ByStatusQuery = useChartEmployeeByStatus()

  return (
    <Card>
      <CardHead>
        <p className='text-dark text-sm font-semibold'>Status pegawai</p>
      </CardHead>
      <CardBody className='pt-0'>
        <ChartContainer
          config={
            (ByStatusQuery.data?.data.data?.chartConfig as ChartConfig) || {}
          }
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={ByStatusQuery.data?.data.data?.chartData || []}
              dataKey='count'
              nameKey='status'
              innerRadius={72}
              strokeWidth={5}
            ></Pie>
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardBody>
    </Card>
  )
}

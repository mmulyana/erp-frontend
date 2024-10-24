import { Card, CardBody, CardHead } from '@/components/common/card-v1'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useChartEmployeeByPosition } from '@/hooks/api/use-chart'
import { useMemo } from 'react'
import { Label, Pie, PieChart } from 'recharts'

export default function CardTotalEmployee() {
  const ByPositionQuery = useChartEmployeeByPosition()

  const total = useMemo(() => {
    return ByPositionQuery.data?.data.data?.chartData.reduce(
      (acc, curr) => acc + curr.count,
      0
    )
  }, [ByPositionQuery.data, ByPositionQuery.isLoading])

  return (
    <Card>
      <CardHead>
        <p className='text-dark text-sm font-semibold'>Jumlah pegawai</p>
      </CardHead>
      <CardBody className='pt-0'>
        <ChartContainer
          config={
            (ByPositionQuery.data?.data.data?.chartConfig as ChartConfig) || {}
          }
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={ByPositionQuery.data?.data.data?.chartData || []}
              dataKey='count'
              nameKey='position'
              innerRadius={50}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {total?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          Pegawai
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend className='flex flex-wrap justify-center' content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardBody>
    </Card>
  )
}

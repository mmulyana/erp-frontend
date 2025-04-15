import { RadialBarChart, PolarRadiusAxis, Label, RadialBar } from 'recharts'

import { useTotalProject } from '@/hooks/api/use-project'
import { useChartProject } from '@/hooks/api/use-chart'
import { useApiData } from '@/shared/hooks/use-api-data'

import { Card, CardBody, CardHead } from '@/components/common/card-v1'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import LoadingState from '@/components/common/loading-state'

import { TEST_ID } from '@/shared/constants/_testId'

export default function ProjectByStatusChart() {
  const { data } = useApiData(useChartProject())
  const { data: totalData } = useApiData(useTotalProject())

  return (
    <Card
      id={TEST_ID.PROJECT_BY_STATUS}
      data-testid={TEST_ID.PROJECT_BY_STATUS}
    >
      <CardHead className='border-b border-line h-fit py-2 px-2'>
        <p className='text-sm text-dark'>Proyek per status</p>
      </CardHead>
      <CardBody className='px-2 relative overflow-hidden h-48'>
        {!data?.chartData || !data?.chartConfig ? (
          <LoadingState />
        ) : (
          <ChartContainer
            config={data?.chartConfig}
            className='aspect-square w-full max-w-[250px] absolute top-[72%] left-1/2 -translate-x-1/2 -translate-y-1/2'
          >
            <RadialBarChart
              data={data?.chartData || []}
              endAngle={180}
              innerRadius={80}
              outerRadius={140}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle'>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className='fill-foreground text-2xl font-bold'
                          >
                            {totalData?.active}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className='fill-muted-foreground'
                          >
                            Proyek
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </PolarRadiusAxis>
              {Object.values(data.chartConfig).map(
                ({ label, color }, index) => (
                  <RadialBar
                    key={index}
                    dataKey={label}
                    stackId='a'
                    fill={color}
                    cornerRadius={5}
                    className='stroke-white stroke-[4px]'
                  />
                )
              )}
            </RadialBarChart>
          </ChartContainer>
        )}
      </CardBody>
    </Card>
  )
}

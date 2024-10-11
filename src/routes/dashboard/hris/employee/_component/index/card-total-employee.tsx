import { Card, Cardbody, CardHead } from '@/components/common/card-v1'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useMemo } from 'react'
import { Label, Pie, PieChart } from 'recharts'

export const chartData1 = [
  { position: 'staff', count: 8, fill: '#274754' },
  { position: 'tukang', count: 20, fill: '#2A9D90' },
  { position: 'helper', count: 28, fill: '#F4A462' },
]
export const chartConfig1 = {
  visitors: {
    label: 'Pegawai',
  },
  staff: {
    label: 'Staff',
    color: 'hsl(var(--chart-1))',
  },
  tukang: {
    label: 'Tukang',
    color: 'hsl(var(--chart-2))',
  },
  helper: {
    label: 'Helper',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig

export default function CardTotalEmployee() {
  const total = useMemo(() => {
    return chartData1.reduce((acc, curr) => acc + curr.count, 0)
  }, [])
  return (
    <Card>
      <CardHead>
        <p className='text-dark text-sm font-semibold'>Jumlah pegawai</p>
      </CardHead>
      <Cardbody className='pt-0'>
        <ChartContainer
          config={chartConfig1}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData1}
              dataKey='count'
              nameKey='position'
              innerRadius={60}
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
                          {total.toLocaleString()}
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
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </Cardbody>
    </Card>
  )
}

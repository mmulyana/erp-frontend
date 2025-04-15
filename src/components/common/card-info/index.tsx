import { cn } from '@/shared/utils/cn'
import { BarChart, TrendingDown, TrendingUp } from 'lucide-react'

type Props = {
  icon?: React.ReactNode
  title: string
  value: string
  percent?: string
  tooltip?: string
  status?: 'up' | 'down'
}
export default function CardInfo({
  title,
  value,
  percent,
  icon,
  status = 'up',
}: Props) {
  return (
    <div className='w-full py-4 px-5 rounded-[6px] border border-[#EFF0F2] flex items-center gap-4'>
      {icon ? (
        icon
      ) : (
        <div className='h-8 w-8 rounded-full bg-[#5463E8]/10 text-[#5463E8] flex justify-center items-center'>
          <BarChart className='w-4 h-4' />
        </div>
      )}
      <div>
        <p className='text-xs text-[#313951]/40'>{title}</p>
        <p className='relative'>
          {value}

          <span
            className={cn(
              'flex gap-0.5 absolute -right-2 top-1/2 -translate-y-1/2 text-[8px] px-1 py-0.5 rounded-[24px] items-center',
              status === 'up'
                ? 'bg-[#19A14F]/10 text-[#19A14F]'
                : 'bg-[#A11931]/10 text-[#A11931]'
            )}
          >
            {status === 'up' ? (
              <TrendingUp className='w-3 h-3 font-medium' />
            ) : (
              <TrendingDown className='w-3 h-3 font-medium' />
            )}
            {percent}
          </span>
        </p>
      </div>
    </div>
  )
}

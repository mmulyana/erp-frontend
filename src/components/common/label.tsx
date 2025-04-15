import { cn } from '@/shared/utils/cn'

type Props = {
  name: string
  color: string
  suffix?: React.ReactNode
  className?: string
}
export default function Label({ name, color, suffix, className }: Props) {
  return (
    <div
      className={cn(
        'py-1 px-2.5 text-sm w-fit relative flex items-center z-[1]',
        suffix && 'pr-1 gap-1',
        className
      )}
    >
      <p className='z-[1] text-nowrap' style={{ color, opacity: '100' }}>
        {name}
      </p>
      {suffix}
      <div
        className='absolute w-full h-full rounded-full top-0 left-0 z-0'
        style={{ background: color, opacity: '0.2' }}
      ></div>
    </div>
  )
}

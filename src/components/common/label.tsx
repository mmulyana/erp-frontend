import { cn } from '@/utils/cn'

type Props = {
  name: string
  color: string
  suffix?: React.ReactNode
}
export default function Label({ name, color, suffix }: Props) {
  return (
    <div
      className={cn(
        'py-0.5 pb-1 px-2.5 text-sm w-fit relative flex items-center z-[1]',
        suffix && 'pr-1 gap-1'
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

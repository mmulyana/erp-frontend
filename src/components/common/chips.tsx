import { cn } from '@/utils/cn'

type Props = {
  text?: string
  status?: boolean
  className?: string
  background?: string
}
export default function Chips({ status, className, background, text }: Props) {
  return (
    <div
      className={cn(
        'text-sm pl-2 pr-[9px] py-0.5 border border-[#EFF0F2] inline-flex items-center gap-1 w-fit rounded-full',
        className
      )}
    >
      <div
        className={cn(
          'w-1 h-1 rounded-full',
          !background && status ? 'bg-green-primary' : 'bg-red-primary'
        )}
        style={{ background: background }}
      ></div>
      <p
        className={cn(
          !text
            ? status
              ? 'text-green-primary'
              : 'text-red-primary'
            : 'text-dark'
        )}
      >
        {text ? text : status ? 'Aktif' : 'Nonaktif'}
      </p>
    </div>
  )
}

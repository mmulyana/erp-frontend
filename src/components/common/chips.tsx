import { cn } from '@/utils/cn'

type Props = {
  status: 'active' | 'nonactive'
  className?: string
}
export default function Chips({ status, className }: Props) {
  return (
    <div
      className={cn(
        'text-sm pl-2 pr-[9px] py-0.5 rounded-[6px] border border-[#EFF0F2] inline-flex items-center gap-1 w-fit',
        className
      )}
    >
      <div
        className={cn(
          'w-1 h-1 rounded-full',
          status === 'active' ? 'bg-[#36B062]' : 'bg-[#D64E44]'
        )}
      ></div>
      <p
        className={cn(
          status === 'active' ? 'text-[#36B062]' : 'text-[#D64E44]'
        )}
      >
        {status == 'active' ? 'Aktif' : 'Nonaktif'}
      </p>
    </div>
  )
}

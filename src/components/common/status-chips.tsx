import { cn } from '@/utils/cn'

type Props = {
  status: boolean
}
export default function StatusChips({ status }: Props) {
  return (
    <div
      className={cn(
        'pl-2 pr-[9px] py-0.5 rounded-[6px] border border-line inline-flex gap-1 items-center'
      )}
    >
      <div
        className={cn(
          'w-1 h-1 rounded-full',
          status ? 'bg-green-primary' : 'bg-red-primary'
        )}
      ></div>
      <p
        className={cn(
          'text-sm',
          status ? 'text-green-primary' : 'text-red-primary'
        )}
      >
        {status ? 'Aktif' : 'Nonaktif'}
      </p>
    </div>
  )
}

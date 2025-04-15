import { Button } from '@/components/ui/button'
import { cn } from '@/shared/utils/cn'

type Props = {
  onClick?: (...val: any) => void
  className?: string
}
export default function ButtonLink({ onClick, className }: Props) {
  return (
    <Button
      className={cn(
        'text-sm rounded-full px-3 py-1 h-fit text-dark font-normal',
        className
      )}
      variant='secondary'
      onClick={onClick}
    >
      Lihat
    </Button>
  )
}

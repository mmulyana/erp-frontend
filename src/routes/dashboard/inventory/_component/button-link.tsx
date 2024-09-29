import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { Link } from 'react-router-dom'

export default function ButtonLink() {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: 'secondary' }),
        'text-sm rounded-full px-3 py-1 h-fit'
      )}
      to='#'
    >
      Lihat
    </Link>
  )
}

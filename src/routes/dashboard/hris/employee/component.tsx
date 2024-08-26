import { cn } from '@/utils/cn'

export function Container({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return <div className={cn('py-4 px-8', className)}>{children}</div>
}

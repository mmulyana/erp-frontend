import { cn } from '@/utils/cn'

export default function Container({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return <div className={cn('p-4', className)}>{children}</div>
}

import { cn } from '@/utils/cn'

type Props<C extends React.ElementType> = {
  isEdit: boolean
  keyData: string
  type?: 'text' | 'select'
  as?: C
  defaultData?: string | number | null
  className?: string
  onUpdate?: (val: string | number) => void
  onEdit?: (val: string) => void
  customData?: (val: string | number) => React.ReactNode
} & React.ComponentPropsWithoutRef<C>

export const Editable = <C extends React.ElementType = 'p'>({
  isEdit,
  defaultData,
  className,
  onUpdate,
  onEdit,
  keyData,
  as,
  type = 'text',
  customData,
  ...props
}: Props<C>) => {
  const Component = as || 'p'
  if (isEdit) {
    return <p>edit</p>
  }

  return (
    <Component className={cn('text-dark', className)} {...props}>
      {customData && defaultData ? customData(defaultData) : defaultData}
    </Component>
  )
}

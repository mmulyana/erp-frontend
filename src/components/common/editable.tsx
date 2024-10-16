import { cn } from '@/utils/cn'
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

type Props<C extends React.ElementType> = {
  isEdit: string | null
  keyData: string
  type?: 'text' | 'select'
  as?: C
  defaultData?: string | number | null
  className?: string
  classNameInput?: string
  onUpdate?: (val: string | number) => void
  onEdit?: (val: string | null) => void
  customData?: (val: string | number) => React.ReactNode
} & React.ComponentPropsWithoutRef<C>

export const Editable = <C extends React.ElementType = 'p'>({
  isEdit,
  defaultData,
  className,
  classNameInput,
  onUpdate,
  onEdit,
  keyData,
  as,
  type = 'text',
  customData,
  ...props
}: Props<C>) => {
  const [data, setData] = useState<null | string | number>(defaultData || null)
  const ref = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!data || !onUpdate || !onEdit) return

      handleBlur()
    }
  }

  useEffect(() => {
    if (defaultData) {
      setData(defaultData)
    }

    return () => setData(null)
  }, [defaultData])

  useEffect(() => {
    if (isEdit === keyData) {
      ref.current?.focus()
    }
  }, [isEdit, keyData])

  const handleBlur = () => {
    if (onUpdate) {
      onUpdate(data as string | number)
    }
    if (onEdit) {
      onEdit(null)
    }
    containerRef.current?.focus()
  }

  const Component = as || 'p'

  return (
    <div ref={containerRef} tabIndex={-1} style={{ outline: 'none' }}>
      {isEdit === keyData ? (
        <Input
          onChange={(e) => setData(e.target.value)}
          value={data || ''}
          onKeyDown={handleKeyDown}
          className={cn('shadow-none h-fit', classNameInput)}
          onBlur={handleBlur}
          ref={ref}
        />
      ) : (
        <Component
          className={cn('text-dark', className)}
          onClick={() => onEdit && onEdit(keyData)}
          {...props}
        >
          {defaultData ? (
            customData && defaultData ? (
              customData(defaultData)
            ) : (
              defaultData
            )
          ) : (
            <Button
              variant='secondary'
              className='font-normal py-1 h-fit pl-2 pr-3 gap-1 flex items-center'
              onClick={() => onEdit && onEdit(keyData)}
            >
              <Plus className='w-3 h-3 text-dark' />
              Tambah
            </Button>
          )}
        </Component>
      )}
    </div>
  )
}

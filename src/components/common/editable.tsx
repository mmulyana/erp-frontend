import { cn } from '@/utils/cn'
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Pencil, Plus } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'

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
  options?: {
    label: string
    value: string
  }[]
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
  options,
  ...props
}: Props<C>) => {
  const [data, setData] = useState<null | string | number>(defaultData || null)
  const ref = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

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
      if (type == 'select') {
        setOpen(true)
        return
      }
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

  const FormType = (type: 'text' | 'select') => {
    switch (type) {
      case 'select':
        return (
          <Select
            open={open}
            onOpenChange={setOpen}
            onValueChange={(val) => {
              onUpdate?.(val)
              onEdit?.(null)
              containerRef.current?.focus()
            }}
          >
            <SelectTrigger className='h-fit p-0 border-none bg-gray-50 py-1 pr-3'>
              <Button
                variant='ghost'
                className={cn('shadow-none h-6 p-0 pl-3', classNameInput)}
              >
                {defaultData ?? 'Pilih'}
              </Button>
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case 'text':
      default:
        return (
          <Input
            onChange={(e) => setData(e.target.value)}
            value={data || ''}
            onKeyDown={handleKeyDown}
            className={cn('shadow-none h-fit', classNameInput)}
            onBlur={handleBlur}
            ref={ref}
          />
        )
    }
  }

  return (
    <div ref={containerRef} tabIndex={-1} style={{ outline: 'none' }}>
      {isEdit === keyData ? (
        FormType(type)
      ) : (
        <Component
          className={cn('text-dark cursor-pointer', className)}
          onClick={() => onEdit && onEdit(keyData)}
          {...props}
        >
          <RenderData
            customData={customData}
            defaultData={defaultData}
            keyData={keyData}
            onEdit={onEdit}
          />
        </Component>
      )}
    </div>
  )
}

type renderProps = {
  defaultData?: string | number | null
  customData?: (val: string | number) => React.ReactNode
  keyData: string
  onEdit?: (val: string | null) => void
}
function RenderData({ customData, defaultData, keyData, onEdit }: renderProps) {
  if (customData && defaultData) {
    return customData?.(defaultData)
  }

  if (defaultData) {
    return (
      <div className='flex gap-2 items-center'>
        {defaultData}
        <Pencil size={14} className='text-gray-400' />
      </div>
    )
  }

  return (
    <Button
      variant='ghost'
      className='font-normal p-0 hover:bg-transparent gap-1 flex items-center text-blue-primary/80 hover:text-blue-primary text-base h-fit pl-4 relative'
      onClick={() => onEdit?.(keyData)}
    >
      <Plus size={12} className='absolute left-0 top-[56%] -translate-y-1/2'/>
      Tambah
    </Button>
  )
}

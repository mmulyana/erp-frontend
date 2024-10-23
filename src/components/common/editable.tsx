import { cn } from '@/utils/cn'
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Pencil, Plus } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'

type Props = {
  isEdit: string | null
  keyData: string
  type?: 'text' | 'select' | 'date' | 'custom'
  defaultData?: string | number | null
  className?: string
  classNameInput?: string
  onUpdate?: (val: string | number) => void
  onEdit?: (val: string | null) => void
  customData?: (val: string | number) => React.ReactNode
  customEdit?: React.ReactNode
  options?: {
    name: string
    value: string
  }[]
}

export const Editable = ({
  isEdit,
  defaultData,
  className,
  classNameInput,
  onUpdate,
  onEdit,
  keyData,
  type = 'text',
  customData,
  options,
  ...props
}: Props) => {
  const [data, setData] = useState<null | string | number>(defaultData || null)
  const ref = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!data || !onUpdate || !onEdit) return

      onUpdate?.(data as string | number)
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
    if (onEdit) {
      onEdit(null)
    }
    containerRef.current?.focus()
  }

  const FormType = (type: 'text' | 'select' | 'date' | 'custom') => {
    switch (type) {
      case 'date':
        return (
          <div className='flex gap-2 items-center'>
            <Input
              onChange={(e) => setData(e.target.value)}
              value={data || ''}
              onKeyDown={handleKeyDown}
              className={cn(
                'shadow-none h-fit block p-0 pl-1 rounded-md border-blue-primary w-[112px]',
                classNameInput
              )}
              ref={ref}
              type='date'
            />
            <Button
              variant='secondary'
              className='h-6 font-normal text-sm rounded-md p-0 px-2 bg-gray-200'
              onClick={() => {
                onUpdate?.(data as string)
                handleBlur()
              }}
            >
              Simpan
            </Button>
          </div>
        )
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
                className={cn('shadow-none h-6 p-0 pl-2', classNameInput)}
              >
                Pilih
              </Button>
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.name}
                </SelectItem>
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
            className={cn(
              'shadow-none h-6 px-2 border border-blue-primary rounded-md',
              classNameInput
            )}
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
        <div
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
        </div>
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
    return (
      <span className='inline-flex gap-2 items-center group'>
        {customData?.(defaultData)}
        <Pencil size={14} className='text-gray-400 hidden group-hover:block' />
      </span>
    )
  }

  if (defaultData) {
    return (
      <span className='inline-flex gap-2 items-center group'>
        {defaultData}
        <Pencil size={14} className='text-gray-400 hidden group-hover:block' />
      </span>
    )
  }

  return (
    <Button
      variant='ghost'
      className='font-normal p-0 hover:bg-transparent inline-flex items-center text-gray-400 text-sm h-fit pl-4 relative'
      onClick={() => onEdit?.(keyData)}
    >
      <Plus
        size={12}
        className='absolute left-0.5 top-[50%] -translate-y-1/2'
      />
      Tambah
    </Button>
  )
}

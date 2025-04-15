import { cn } from '@/shared/utils/cn'
import React, {
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
  useCallback,
  memo,
} from 'react'
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
    value: string | number
  }[]
  disabled?: boolean
}

type renderProps = {
  defaultData?: string | number | null
  customData?: (val: string | number) => React.ReactNode
  keyData: string
  onEdit?: (val: string | null) => void
  disabled?: boolean
}

const RenderData = memo(
  ({ customData, defaultData, keyData, onEdit, disabled }: renderProps) => {
    if (
      (customData && defaultData) ||
      (typeof defaultData == 'number' && defaultData === 0)
    ) {
      return (
        <span
          className={cn(
            'inline-flex gap-2 items-center group w-full',
            disabled && 'cursor-default'
          )}
        >
          {customData?.(defaultData)}
          {!disabled && (
            <Pencil
              size={14}
              className='text-gray-400 hidden group-hover:block'
            />
          )}
        </span>
      )
    }

    if (defaultData || (typeof defaultData == 'number' && defaultData === 0)) {
      return (
        <span
          className={cn(
            'inline-flex gap-2 items-center group',
            disabled && 'cursor-default'
          )}
        >
          {defaultData}
          {!disabled && (
            <Pencil
              size={14}
              className='text-gray-400 hidden group-hover:block'
            />
          )}
        </span>
      )
    }

    if (disabled) {
      return null
    }

    return (
      <Button
        variant='ghost'
        className='font-normal p-0 hover:bg-transparent inline-flex items-center text-gray-400 text-sm h-9 pl-4 relative'
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
)

export const Editable = memo(
  ({
    isEdit,
    defaultData,
    className,
    classNameInput,
    onUpdate,
    onEdit,
    keyData,
    type = 'text',
    customData,
    customEdit,
    options,
    disabled,
    ...props
  }: Props) => {
    const [data, setData] = useState<null | string | number>(
      () => defaultData || null
    )
    const ref = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
      if (defaultData || typeof defaultData === 'number') {
        setData(defaultData)
      }
      return () => setData(null)
    }, [defaultData])

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          if (!data || !onUpdate || !onEdit) return
          onUpdate?.(data as string | number)
          handleBlur()
        }
      },
      [data, onUpdate, onEdit]
    )

    const handleBlur = useCallback(() => {
      onEdit?.(null)
      containerRef.current?.focus()
    }, [onEdit])

    useEffect(() => {
      if (isEdit === keyData) {
        if (type === 'select') {
          setOpen(true)
          return
        }
        ref.current?.focus()
      }
    }, [isEdit, keyData, type])

    const FormType = (type: 'text' | 'select' | 'date' | 'custom') => {
      switch (type) {
        case 'custom':
          return customEdit
        case 'date':
          return (
            <div className='flex gap-2 items-center'>
              <Input
                onChange={(e) => setData(e.target.value)}
                value={data || ''}
                onKeyDown={handleKeyDown}
                className={cn(
                  'shadow-none h-9 block p-0 pl-1 rounded-md border-blue-primary w-[120px]',
                  classNameInput
                )}
                ref={ref}
                type='date'
              />
              <Button
                variant='secondary'
                className='h-9 font-normal text-sm rounded-md p-0 px-2 bg-gray-200'
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
            <div className='flex gap-2 items-center'>
              <Select
                open={open}
                onOpenChange={setOpen}
                onValueChange={(val) => {
                  onUpdate?.(val)
                  onEdit?.(null)
                  containerRef.current?.focus()
                }}
              >
                <SelectTrigger
                  className={cn('h-9 p-0 border-none bg-gray-100 px-2.5 gap-2')}
                >
                  Pilih
                </SelectTrigger>
                <SelectContent
                  className='w-fit px-0'
                  style={{ width: 'var(--radix-select-trigger-width)' }}
                >
                  {options?.map((option) => (
                    <SelectItem
                      key={option.value}
                      className='px-2'
                      value={String(option.value)}
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant='ghost'
                className='h-full'
                onClick={() => onEdit?.(null)}
              >
                Batal
              </Button>
            </div>
          )
        case 'text':
        default:
          return (
            <Input
              onChange={(e) => setData(e.target.value)}
              value={data || ''}
              onKeyDown={handleKeyDown}
              className={cn(
                'shadow-none h-9 bg-gray-100 py-1 px-2 borderrounded-md',
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
            onClick={() => !disabled && onEdit?.(keyData)}
            {...props}
          >
            <RenderData
              defaultData={defaultData}
              customData={customData}
              disabled={disabled}
              keyData={keyData}
              onEdit={onEdit}
            />
          </div>
        )}
      </div>
    )
  }
)

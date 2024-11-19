import { Controller, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/utils/cn'
import { useDebounce } from '@uidotdev/usehooks'

type Props = {
  name: string
  preview?: (val: string) => React.ReactNode
  placeholder?: string
  customPlaceholder?: React.ReactNode
  children: React.ReactNode
  onSearch?: (value: string) => void
  emptyComponent?: (searchValue: string) => React.ReactNode
  className?: string
  side?: 'top' | 'bottom' | 'right' | 'left'
  prefix?: React.ReactNode
  value?: string
  onChange?: (value: string) => void
  useFormMode?: boolean
  shouldFilter?: boolean
  debounceMs?: number
  modal?: boolean
  contentStyle?: string
}

const SelectContent = ({
  value,
  preview,
  placeholder,
  children,
  onSearch,
  emptyComponent,
  className,
  side,
  prefix,
  shouldFilter = true,
  debounceMs = 300,
  modal = true,
  contentStyle,
}: Omit<Props, 'name' | 'useFormMode'> & {
  value: string
  onChange: (value: string) => void
}) => {
  const [searchValue, setSearchValue] = useState('')
  const debounceSearch = useDebounce(searchValue, debounceMs)

  useEffect(() => {
    if (onSearch) {
      onSearch(debounceSearch)
    }
  }, [debounceSearch, onSearch])

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  return (
    <Popover modal={modal}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-full justify-between items-center font-normal h-10 text-dark px-2.5',
            className
          )}
          type='button'
        >
          {prefix && prefix}
          <span>{value ? preview?.(value) : placeholder ?? 'Pilih data'}</span>
          <ChevronsUpDown size={14} className='text-gray-400' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('p-0', contentStyle)}
        side={side || 'bottom'}
        align='start'
      >
        <Command shouldFilter={shouldFilter}>
          <CommandInput placeholder='Search...' onValueChange={handleSearch} />
          <CommandList>
            <CommandEmpty>
              {emptyComponent
                ? emptyComponent(searchValue)
                : `No results found for "${searchValue}"`}
            </CommandEmpty>
            <CommandGroup>{children}</CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default function SelectV1({
  name,
  value: propValue,
  onChange: propOnChange,
  useFormMode = true,
  ...rest
}: Props) {
  const formContext = useFormContext()

  if (useFormMode && formContext) {
    return (
      <Controller
        name={name}
        control={formContext.control}
        render={({ field }) => (
          <SelectContent
            value={field.value}
            onChange={field.onChange}
            {...rest}
          />
        )}
      />
    )
  }

  return (
    <SelectContent
      value={propValue || ''}
      onChange={propOnChange || (() => {})}
      {...rest}
    />
  )
}

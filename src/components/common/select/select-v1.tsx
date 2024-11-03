import { Controller, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from 'lucide-react'
import React, { useState } from 'react'
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
}: Omit<Props, 'name' | 'useFormMode'> & {
  value: string
  onChange: (value: string) => void
}) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (value: string) => {
    setSearchValue(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  return (
    <Popover modal>
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
      <PopoverContent className='p-0' side={side || 'bottom'} align='start'>
        <Command>
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

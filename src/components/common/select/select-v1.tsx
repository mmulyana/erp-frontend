import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
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
  open: boolean
  setOpen: (val: boolean) => void
  name: string
  preview: (val: string) => React.ReactNode
  placeholder?: string
  customPlaceholder?: React.ReactNode
  children: React.ReactNode
  onSearch?: (value: string) => void
  emptyComponent?: (searchValue: string) => React.ReactNode
  classNameBtn?: string
  side?: 'top' | 'bottom' | 'right' | 'left'
}

export default function SelectV1({
  open,
  setOpen,
  name,
  preview,
  placeholder,
  children,
  onSearch,
  emptyComponent,
  classNameBtn,
  side,
  customPlaceholder,
}: Props) {
  const form = useFormContext()
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (value: string) => {
    setSearchValue(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  useEffect(() => {
    if (!open) setSearchValue('')
  }, [open])

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            {field.value ? (
              preview(field.value)
            ) : customPlaceholder ? (
              customPlaceholder
            ) : (
              <Button
                size='sm'
                variant='outline'
                className={cn('w-full justify-start', classNameBtn)}
                type='button'
              >
                <span>{placeholder ?? 'Select data'}</span>
              </Button>
            )}
          </PopoverTrigger>
          <PopoverContent className='p-0' side={side || 'bottom'} align='start'>
            <Command>
              <CommandInput
                placeholder='Search...'
                onValueChange={handleSearch}
              />
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
      )}
    />
  )
}

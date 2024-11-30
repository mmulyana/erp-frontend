import React, { useState, useCallback, useEffect } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import useUrlState from '@ahooksjs/use-url-state'
import { useDebounce } from '@uidotdev/usehooks'

import { TEST_ID } from '@/utils/constant/_testId'

import { Input } from '@/components/ui/input'

type Props = {
  placeholder?: string
  withoutUrl?: boolean
  onSearch?: (val: string) => void
  debounceTime?: number
}

export default function Search({
  placeholder = 'Search',
  withoutUrl = false,
  onSearch,
  debounceTime = 300,
}: Props) {
  const [url, setUrl] = useUrlState({ name: undefined })
  const [search, setSearch] = useState(withoutUrl ? '' : url.name)

  const debouncedSearch = useDebounce(search, debounceTime)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
  }, [])

  useEffect(() => {
    if (!withoutUrl) {
      if (debouncedSearch === '') {
        setUrl({ name: undefined })
      } else {
        setUrl({ name: debouncedSearch })
      }
    }
  }, [debouncedSearch, withoutUrl, setUrl])

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearch)
    }
  }, [debouncedSearch, onSearch])

  useEffect(() => {
    if (!withoutUrl) {
      setSearch(url.name)
    }
  }, [url.name, withoutUrl])

  return (
    <div className='relative' id={TEST_ID.SEARCH} data-testid={TEST_ID.SEARCH}>
      <label
        htmlFor='searchV1'
        className='absolute left-3 top-1/2 -translate-y-1/2'
      >
        <SearchIcon className='h-4 w-4 text-muted-foreground' />
      </label>
      <Input
        id='searchV1'
        value={search}
        onChange={handleChange}
        placeholder={placeholder}
        className='pl-8 text-sm h-8 py-2 shadow-md shadow-gray-100 border border-[#e3e4e7] rounded-[8px] max-w-32'
      />
    </div>
  )
}

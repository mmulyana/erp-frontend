import { Search as SearchIcon } from 'lucide-react'
import useUrlState from '@ahooksjs/use-url-state'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { cn } from '@/utils/cn'

export default function SearchV2() {
  const [url, setUrl] = useUrlState({ name: '' })
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div
      className={cn(
        !isFocused && 'w-8 flex items-center justify-center',
        'relative h-8 rounded-[8px] border border-[#EFF0F2]'
      )}
    >
      <label
        htmlFor='search'
        onClick={() => {
          setIsFocused(true)
        }}
      >
        <SearchIcon
          className={cn(
            !!isFocused && 'absolute left-3 top-1/2 -translate-y-1/2',
            'h-4 w-4 text-muted-foreground cursor-pointer'
          )}
        />
      </label>
      <Input
        id='search'
        value={url.name}
        onChange={(e) => setUrl({ name: e.target.value })}
        placeholder='Search'
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          'pl-8 text-sm h-8 shadow-md shadow-gray-100 border border-[#EFF0F2] rounded-[8px]',
          !isFocused ? 'hidden' : 'block'
        )}
      />
    </div>
  )
}

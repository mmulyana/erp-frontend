import { Search as SearchIcon } from 'lucide-react'
import useUrlState from '@ahooksjs/use-url-state'
import { Input } from '@/components/ui/input'

type Props = {
  placeholder?: string
}
export default function Search({ placeholder }: Props) {
  const [url, setUrl] = useUrlState({ name: '' })

  return (
    <div className='relative'>
      <label
        htmlFor='searchV1'
        className='absolute left-3 top-1/2 -translate-y-1/2'
      >
        <SearchIcon className='h-4 w-4 text-muted-foreground' />
      </label>
      <Input
        id='SearchV1'
        value={url.name}
        onChange={(e) => setUrl({ name: e.target.value })}
        placeholder={placeholder || 'search'}
        className='pl-8 text-sm h-8 py-2 shadow-md shadow-gray-100 border border-[#e3e4e7] rounded-[8px] max-w-32'
      />
    </div>
  )
}

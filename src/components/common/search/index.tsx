import { Search as SearchIcon } from 'lucide-react'
import useUrlState from '@ahooksjs/use-url-state'
import { Input } from '@/components/ui/input'

export default function Search() {
  const [url, setUrl] = useUrlState({ name: '' })

  return (
    <div className='relative'>
      <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
      <Input
        value={url.name}
        onChange={(e) => setUrl({ name: e.target.value })}
        placeholder='Search'
        className='pl-8 text-sm h-8 py-2 shadow-md shadow-gray-100 border border-[#EFF0F2] rounded-[8px]'
      />
    </div>
  )
}

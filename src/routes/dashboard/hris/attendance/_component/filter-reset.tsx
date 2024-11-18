import useUrlState from '@ahooksjs/use-url-state'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function FilterReset() {
  const [url, setUrl] = useUrlState({ name: '', date: '' })

  if (url.date !== '' || url.name !== '') {
    return (
      <Button
        variant='outline'
        className='font-normal flex items-center gap-1 relative pl-3 pr-6'
        onClick={() => {
          setUrl({ date: undefined, name: undefined })
        }}
      >
        Hapus filter
        <X
          size={14}
          className='text-red-primary/80 absolute top-[55%] right-1.5 -translate-y-1/2'
        />
      </Button>
    )
  }

  return null
}

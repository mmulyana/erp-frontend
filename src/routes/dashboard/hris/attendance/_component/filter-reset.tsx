import useUrlState from '@ahooksjs/use-url-state'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getWeek } from 'date-fns'

export default function FilterReset() {
  const [url, setUrl] = useUrlState({ name: '', date: '', week: '' })

  if (
    url.date !== '' ||
    url.name !== '' ||
    Number(url.week) !== getWeek(new Date())
  ) {
    return (
      <Button
        variant='secondary'
        className='font-normal flex items-center gap-1 relative px-2 py-0 bg-gray-100'
        onClick={() => {
          setUrl({
            date: undefined,
            name: undefined,
            week: getWeek(new Date()),
          })
        }}
      >
        <p className='px-1'>Hapus filter</p>
        <X
          size={14}
          strokeWidth={3}
          className='text-red-primary/80'
        />
      </Button>
    )
  }

  return null
}

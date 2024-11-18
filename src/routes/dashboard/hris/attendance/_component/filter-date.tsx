import useUrlState from '@ahooksjs/use-url-state'
import { CalendarDaysIcon } from 'lucide-react'
import { format, parse } from 'date-fns'
import { id } from 'date-fns/locale'

import { cn } from '@/utils/cn'

import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export default function FilterDate() {
  const [url, setUrl] = useUrlState({ date: '' })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn('w-fit pl-3 gap-2 text-left font-normal text-dark')}
        >
          <CalendarDaysIcon className='h-4 w-4 text-[#2A9D90]' />
          {url.date ? (
            format(
              parse(url.date, 'yyyy-MM-dd', new Date()),
              'EEEE, dd MMM yyyy',
              {
                locale: id,
              }
            )
          ) : (
            <span>Pilih tanggal</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={
            url.date ? parse(url.date, 'yyyy-MM-dd', new Date()) : undefined
          }
          onSelect={(val) => {
            if (val) {
              const formattedDate = format(val, 'yyyy-MM-dd')
              setUrl((prev) => ({ ...prev, date: formattedDate }))
            }
          }}
          disabled={(date) =>
            date > new Date() || date < new Date('2024-01-01')
          }
        />
      </PopoverContent>
    </Popover>
  )
}

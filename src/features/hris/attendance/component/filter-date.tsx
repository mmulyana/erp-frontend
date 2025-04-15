import useUrlState from '@ahooksjs/use-url-state'
import { CalendarDaysIcon } from 'lucide-react'
import { format, parse } from 'date-fns'
import { id } from 'date-fns/locale'

import { TEST_ID } from '@/shared/utils/constant/_testId'
import { cn } from '@/shared/utils/cn'

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
      <PopoverTrigger
        asChild
        id={TEST_ID.FILTER_DATE_ATTENDANCE}
        data-testid={TEST_ID.FILTER_DATE_ATTENDANCE}
      >
        <Button
          variant='outline'
          className={cn('w-fit px-2 gap-1 text-left font-normal text-dark')}
        >
          <CalendarDaysIcon className='h-4 w-4 text-[#2A9D90]' />
          <span className='px-1'>
            {url.date
              ? format(
                  parse(url.date, 'yyyy-MM-dd', new Date()),
                  'EEEE, dd MMM yyyy',
                  {
                    locale: id,
                  }
                )
              : 'Pilih tanggal'}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto p-0'
        align='start'
        data-testid={TEST_ID.FILTER_DATE_ATTENDANCE_CONTENT}
      >
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

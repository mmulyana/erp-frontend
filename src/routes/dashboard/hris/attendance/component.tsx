import { addDays, format, isValid, subDays, parse, isToday } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useUrlState from '@ahooksjs/use-url-state'
import { Button } from '@/components/ui/button'
import { id } from 'date-fns/locale'
import { useState } from 'react'

export function Header() {
  const [url, setUrl] = useUrlState({ date: '' })
  const [currDate, setCurrDate] = useState(() => {
    if (url.date && url.date !== '') {
      const parsedDate = parse(url.date, 'dd-MM-yyyy', new Date())
      if (isValid(parsedDate)) {
        return parsedDate
      } else {
        console.warn(
          `Invalid date format: ${url.date}. Using current date instead.`
        )
        return new Date()
      }
    }
    return new Date()
  })

  const formatDate = (date: Date): string => {
    return format(date, 'dd MMMM yyyy', { locale: id })
  }

  const formatDay = (date: Date): string => {
    return format(date, 'EEEE', { locale: id })
  }

  const nextDate = () => {
    setCurrDate((prev) => addDays(prev, 1))
    setUrl({ date: format(addDays(currDate, 1), 'dd-MM-yyy') })
  }

  const prevDate = () => {
    setCurrDate((prev) => subDays(prev, 1))
    setUrl({ date: format(subDays(currDate, 1), 'dd-MM-yyyy') })
  }

  return (
    <div className='flex justify-between items-center'>
      <div>
        <div className='flex'>
          <p className='text-lg text-[#021328] font-medium'>
            {formatDay(currDate)},{' '}
            <span className='opacity-50'>{formatDate(currDate)}</span>
          </p>
        </div>
      </div>
      <div>
        <Button variant='ghost' onClick={prevDate}>
          <ChevronLeft className='w-4 h-4' />
        </Button>
        <Button variant='ghost' onClick={nextDate} disabled={isToday(currDate)}>
          <ChevronRight className='w-4 h-4' />
        </Button>
      </div>
    </div>
  )
}

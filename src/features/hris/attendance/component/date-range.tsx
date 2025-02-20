import useUrlState from '@ahooksjs/use-url-state'
import { format, startOfWeek, endOfWeek, addWeeks, startOfYear } from 'date-fns'
import { id } from 'date-fns/locale'
import { useMemo } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useDateData } from '../hook/use-date-data'
import { CalendarDaysIcon } from 'lucide-react'
import { TEST_ID } from '@/utils/constant/_testId'

const DateRange = () => {
  const [url, setUrl] = useUrlState({ week: '' })
  const { startDate, endDate } = useDateData(
    url.week !== '' ? Number(url.week) : undefined
  )

  // Generate all weeks in the current year
  const weeks = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const firstDay = startOfYear(new Date(currentYear, 0, 1))
    const weeks = []

    for (let week = 1; week <= 53; week++) {
      const start = startOfWeek(addWeeks(firstDay, week - 1), {
        weekStartsOn: 1,
      })
      const end = endOfWeek(start, { weekStartsOn: 1 })

      if (start.getFullYear() === currentYear) {
        weeks.push({
          week,
          label: `${format(start, 'dd MMM', { locale: id })} - ${format(
            end,
            'dd MMM',
            { locale: id }
          )}`,
          start,
          end,
        })
      }
    }

    return weeks
  }, [])

  const handleWeekChange = (value: string) => {
    setUrl({ week: value })
  }

  return (
    <Select value={url.week.toString()} onValueChange={handleWeekChange}>
      <SelectTrigger
        className='w-fit gap-2.5 px-2 h-8 rounded-lg'
        id={TEST_ID.SELECT_DATE_ATTENDANCE}
        data-testid={TEST_ID.SELECT_DATE_ATTENDANCE}
      >
        <SelectValue className='px-1'>
          <div className='flex items-center gap-1.5'>
            <CalendarDaysIcon className='h-4 w-4 text-[#2A9D90]' />
            <p className='text-dark font-medium'>
              {format(startDate, 'dd MMM', { locale: id })}
            </p>
            <p className='text-dark/70 text-sm'>s.d</p>
            <p className='text-dark font-medium'>
              {format(endDate, 'dd MMM', { locale: id })}
            </p>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        className='h-80'
        id={TEST_ID.SELECT_DATE_ATTENDANCE_CONTENT}
        data-testid={TEST_ID.SELECT_DATE_ATTENDANCE_CONTENT}
      >
        {weeks.map((week) => (
          <SelectItem key={week.week} value={week.week.toString()}>
            {week.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default DateRange

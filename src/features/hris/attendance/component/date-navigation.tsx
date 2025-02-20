import {
  format,
  addDays,
  isAfter,
  startOfToday,
  isYesterday,
  getWeek,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useUrlState from '@ahooksjs/use-url-state'
import { id } from 'date-fns/locale'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'

import { TEST_ID } from '@/utils/constant/_testId'
import { cn } from '@/utils/cn'

import { viewAtom } from './view-toggle'

const DateNavigation = () => {
  const view = useAtomValue(viewAtom)

  const [url, setUrl] = useUrlState({ date: '', week: '' })

  const getCurrentDate = () => {
    if (!url.date) {
      return startOfToday()
    }
    return new Date(url.date)
  }

  const currentDate = getCurrentDate()
  const today = startOfToday()

  const handlePrevious = () => {
    if (view === 'table') {
      const prevWeek = Number(url.week) - 1
      setUrl((prev) => ({ ...prev, week: prevWeek }))

      return
    }
    const newDate = addDays(currentDate, -1)
    setUrl({ date: format(newDate, 'yyyy-MM-dd') })
  }

  const handleNext = () => {
    if (view === 'table') {
      const nextWeek = Number(url.week) + 1
      setUrl((prev) => ({ ...prev, week: nextWeek }))
      return
    }
    const newDate = addDays(currentDate, 1)
    if (isYesterday(new Date(url.date))) {
      setUrl({ date: undefined })
      return
    }
    setUrl({ date: format(newDate, 'yyyy-MM-dd') })
  }

  useEffect(() => {
    if (view === 'table' && url.week === '') {
      const weekNumber = getWeek(url.date || new Date())
      setUrl((prev) => ({ ...prev, week: weekNumber }))
    }
  }, [view])

  const isNextDisabled = !isAfter(today, currentDate)
  const isNextWeekDisabled = Number(url.week) + 1 > getWeek(new Date())

  return (
    <div
      className='flex items-center justify-center gap-2 border rounded-full bg-gray-100 p-0.5 px-1'
      id={TEST_ID.BUTTON_NAVIGATION_DATE}
      data-testid={TEST_ID.BUTTON_NAVIGATION_DATE}
    >
      <button
        onClick={handlePrevious}
        className='p-2 rounded-full bg-white shadow-md'
        id={TEST_ID.BUTTON_PREV_DATE}
        data-testid={TEST_ID.BUTTON_PREV_DATE}
      >
        <ChevronLeft size={14} />
      </button>

      <div className='text-sm text-center'>
        {view === 'grid' ? (
          format(currentDate, 'dd/MM/yyyy', { locale: id })
        ) : (
          <p className='text-dark/70'>
            Minggu ke-<span className='font-medium'>{url.week}</span>
          </p>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={
          view !== 'table' && view === 'grid'
            ? isNextDisabled
            : isNextWeekDisabled
        }
        className={cn(
          'p-2 rounded-full bg-white',
          view !== 'table' && view === 'grid'
            ? isNextDisabled
            : isNextWeekDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'shadow-md'
        )}
        id={TEST_ID.BUTTON_NEXT_DATE}
        data-testid={TEST_ID.BUTTON_NEXT_DATE}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

export default DateNavigation

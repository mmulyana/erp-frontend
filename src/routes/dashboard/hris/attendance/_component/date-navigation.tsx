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

import { cn } from '@/utils/cn'
import { useAtomValue } from 'jotai'
import { viewAtom } from './view-toggle'
import { useEffect } from 'react'

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
      const nextWeek = Number(url.week) - 1
      setUrl((prev) => ({ ...prev, week: nextWeek }))

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
    if (view === 'table') {
      const weekNumber = getWeek(url.date || new Date())
      setUrl((prev) => ({ ...prev, week: weekNumber }))
    }
  }, [view])

  const isNextDisabled = !isAfter(today, currentDate)

  return (
    <div className='flex items-center justify-center gap-2 border rounded-full bg-gray-100 p-0.5 px-1'>
      <button
        onClick={handlePrevious}
        className='p-2 rounded-full bg-white shadow-md'
      >
        <ChevronLeft size={14} />
      </button>

      <div className='text-sm text-center'>
        {view === 'grid'
          ? format(currentDate, 'dd/MM/yyyy', { locale: id })
          : url.week}
      </div>

      <button
        onClick={handleNext}
        disabled={view !== 'table' && isNextDisabled}
        className={cn(
          'p-2 rounded-full bg-white',
          view !== 'table' && isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'shadow-md'
        )}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

export default DateNavigation

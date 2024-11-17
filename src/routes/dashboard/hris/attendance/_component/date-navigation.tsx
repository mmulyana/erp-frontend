import { format, addDays, isAfter, startOfToday } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useUrlState from '@ahooksjs/use-url-state'
import { id } from 'date-fns/locale'

import { cn } from '@/utils/cn'

const DateNavigation = () => {
  const [url, setUrl] = useUrlState({ date: '' })

  const getCurrentDate = () => {
    if (!url.date) {
      return startOfToday()
    }
    return new Date(url.date)
  }

  const currentDate = getCurrentDate()
  const today = startOfToday()

  const handlePrevious = () => {
    const newDate = addDays(currentDate, -1)
    setUrl({ date: format(newDate, 'yyyy-MM-dd') }) 
  }

  const handleNext = () => {
    const newDate = addDays(currentDate, 1)
    if (isAfter(newDate, currentDate)) {
      setUrl({ date: undefined })
      return
    }
    setUrl({ date: format(newDate, 'yyyy-MM-dd') })
  }

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
        {format(currentDate, 'dd/MM/yyyy', { locale: id })}
      </div>

      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className={cn(
          'p-2 rounded-full bg-white',
          isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'shadow-md'
        )}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

export default DateNavigation

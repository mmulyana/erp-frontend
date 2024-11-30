import { getWeekDates } from '@/utils/get-week-dates'
import { getWeek } from 'date-fns'

export const useDateData = (number?: number) => {
  const weekNumber = getWeek(new Date())
  const week = getWeekDates(number ? number : weekNumber)

  return week
}

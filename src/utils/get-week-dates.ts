import { endOfWeek, setWeek, startOfWeek } from 'date-fns'

export const getWeekDates = (weekNumber: number) => {
  const dateInWeek = setWeek(new Date(), weekNumber, { weekStartsOn: 1 })
  const startDate = startOfWeek(dateInWeek, { weekStartsOn: 1 })
  const endDate = endOfWeek(dateInWeek, { weekStartsOn: 1 })

  return { startDate, endDate }
}

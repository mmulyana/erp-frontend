import { eachDayOfInterval, isSunday, parseISO } from 'date-fns'

export const getDaysDifference = (dateString: string): number => {
  if (!dateString) return 0

  const startDate = parseISO(dateString)
  const endDate = new Date()

  const allDays = eachDayOfInterval({ start: startDate, end: endDate })
  const validDays = allDays.filter((day) => !isSunday(day))

  return validDays.length
}

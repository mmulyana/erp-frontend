import { useMemo } from 'react'

export function useWeek(baseDate: Date = new Date()) {
	return useMemo(() => {
		const day = baseDate.getDay()
		const diffToMonday = day === 0 ? -6 : 1 - day

		const monday = new Date(baseDate)
		monday.setDate(baseDate.getDate() + diffToMonday)
		monday.setHours(0, 0, 0, 0)

		const sunday = new Date(monday)
		sunday.setDate(monday.getDate() + 6)
		sunday.setHours(23, 59, 59, 999)

		return { startOfWeek: monday, endOfWeek: sunday }
	}, [baseDate])
}

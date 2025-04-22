import { useMemo } from 'react'

export function useWeekRange(): string[] {
	return useMemo(() => {
		const today = new Date()

		const day = today.getDay()

		const offsetToMonday = day === 0 ? 6 : day - 1
		const offsetToSunday = day === 0 ? 0 : 7 - day

		const thisWeekMonday = new Date(today)
		thisWeekMonday.setDate(today.getDate() - offsetToMonday)

		const lastWeekMonday = new Date(thisWeekMonday)
		lastWeekMonday.setDate(thisWeekMonday.getDate() - 7)

		const thisWeekSunday = new Date(today)
		thisWeekSunday.setDate(today.getDate() + offsetToSunday)

		const dates: string[] = []
		const current = new Date(lastWeekMonday)

		while (current <= thisWeekSunday) {
			const yyyy = current.getFullYear()
			const mm = String(current.getMonth() + 1).padStart(2, '0')
			const dd = String(current.getDate()).padStart(2, '0')
			dates.push(`${yyyy}-${mm}-${dd}`)

			current.setDate(current.getDate() + 1)
		}

		return dates
	}, [])
}

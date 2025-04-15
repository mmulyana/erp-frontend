import { useMemo } from 'react'

export const CALENDAR_ARR = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[9, 10, 11],
]

export function useCurrentCalendarGroup() {
	const result = useMemo(() => {
		const currentMonth = new Date().getMonth() // 0-11
		const groupIndex = CALENDAR_ARR.findIndex((group) =>
			group.includes(currentMonth)
		)
		const group = CALENDAR_ARR[groupIndex]

		return {
			currentMonth,
			group,
		}
	}, [])

	return result
}

import { useMemo } from 'react'
import { CALENDAR_ARR } from './use-current-month'

export function useDateRange(groupIndex: number) {
	const now = new Date()
	const year = now.getFullYear()

	const { startDate, endDate } = useMemo(() => {
		const group = CALENDAR_ARR[groupIndex]
		const startMonth = group[0]
		const endMonth = group[group.length - 1]

		const startDate = new Date(year, startMonth, 1)
		const endDate = new Date(year, endMonth + 1, 0)
		return { startDate, endDate }
	}, [groupIndex, year])

	return { startDate, endDate }
}

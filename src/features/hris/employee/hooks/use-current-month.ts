import { useState } from 'react'

export const CALENDAR_ARR = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[9, 10, 11],
]

export function useCurrentMonth() {
	const currentMonth = new Date().getMonth()
	const initialGroupIndex = CALENDAR_ARR.findIndex((group) =>
		group.includes(currentMonth)
	)

	const [groupIndex, setGroupIndex] = useState(initialGroupIndex)

	const group = CALENDAR_ARR[groupIndex]

	const prev = () => {
		setGroupIndex((prev) => (prev > 0 ? prev - 1 : prev))
	}

	const next = () => {
		setGroupIndex((prev) => (prev < CALENDAR_ARR.length - 1 ? prev + 1 : prev))
	}

	return {
		currentMonth,
		groupIndex,
		group,
		prev,
		next,
		canPrev: groupIndex > 0,
		canNext: groupIndex < CALENDAR_ARR.length - 1,
	}
}

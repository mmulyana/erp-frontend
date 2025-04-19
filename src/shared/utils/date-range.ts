export function getDatesInRange(start: string, end: string): string[] {
	const startDate = new Date(start)
	const endDate = new Date(end)
	const dates: string[] = []

	while (startDate <= endDate) {
		dates.push(new Date(startDate).toISOString())
		startDate.setDate(startDate.getDate() + 1)
	}

	return dates
}

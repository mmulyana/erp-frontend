export function debounce<T extends (...args: any[]) => void>(
	func: T,
	delay: number
) {
	let timeoutId: ReturnType<typeof setTimeout>
	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => func(...args), delay)
	}
}

export const convertUTCToWIB = (utcDate: Date | string): Date => {
	const date = new Date(utcDate)
	return new Date(date.getTime() + 7 * 60 * 60 * 1000)
}

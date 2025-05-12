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

export function formatToRupiah(number: number) {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(number)
}

export function formatPhone(number: string) {
	const cleanNumber = number.replace(/\D/g, '')

	if (cleanNumber.length === 11) {
		return cleanNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
	} else if (cleanNumber.length === 12) {
		return cleanNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')
	} else if (cleanNumber.length === 13) {
		return cleanNumber.replace(/(\d{4})(\d{4})(\d{5})/, '$1-$2-$3')
	} else {
		return cleanNumber.match(/.{1,4}/g)?.join('-') || cleanNumber
	}
}

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

export function toFormData(payload: Record<string, any>): FormData {
	const formData = new FormData()

	Object.entries(payload).forEach(([key, value]) => {
		if (value instanceof File || value instanceof Blob) {
			formData.append(key, value)
		} else if (value instanceof Date) {
			formData.append(key, value.toISOString())
		} else if (
			typeof value === 'string' ||
			typeof value === 'number' ||
			typeof value === 'boolean'
		) {
			formData.append(key, String(value))
		} else if (Array.isArray(value)) {
			value.forEach((item, index) => {
				if (typeof item === 'object' && item !== null) {
					Object.entries(item).forEach(([childKey, childVal]) => {
						formData.append(`${key}[${index}][${childKey}]`, String(childVal))
					})
				} else {
					formData.append(`${key}[${index}]`, String(item))
				}
			})
		} else if (value && typeof value === 'object') {
			Object.entries(value).forEach(([childKey, childVal]) => {
				formData.append(`${key}[${childKey}]`, String(childVal))
			})
		}
	})

	return formData
}

export function formatThousands(value: any): string {
	if (typeof value === 'number') {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
	} else {
		return '-'
	}
}

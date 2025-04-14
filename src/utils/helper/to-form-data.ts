export function toFormData(payload: Record<string, any>): FormData {
	const formData = new FormData()

	Object.entries(payload).forEach(([key, value]) => {
		if (value instanceof File || value instanceof Blob) {
			formData.append(key, value)
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

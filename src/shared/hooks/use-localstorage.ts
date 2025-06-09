import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => {
		if (typeof window === 'undefined') return initialValue
		try {
			const item = localStorage.getItem(key)
			return item ? (JSON.parse(item) as T) : initialValue
		} catch (error) {
			console.error(error)
			return initialValue
		}
	})

	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(value))
		} catch (error) {
			console.error(error)
		}
	}, [key, value])

	return [value, setValue] as const
}

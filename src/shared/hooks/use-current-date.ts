import { useMemo } from 'react'

export function useCurrentDate() {
	const month = useMemo(() => new Date().getMonth(), [])
	const date = useMemo(() => new Date().getDate(), [])
	const year = useMemo(() => new Date().getFullYear(), [])

	return {
		month,
		date,
		year
	}
}

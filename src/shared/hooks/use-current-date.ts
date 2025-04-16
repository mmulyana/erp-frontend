import { useMemo } from 'react'

export function useCurrentDate() {
	const month = useMemo(() => new Date().getMonth(), [])
	const date = useMemo(() => new Date().getDate(), [])

	return {
		month,
		date,
	}
}

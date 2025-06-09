import { useMemo } from 'react'

export function useHasQueryValue(query: Record<string, any>): boolean {
	return useMemo(() => {
		return Object.values(query).some(Boolean)
	}, [query])
}

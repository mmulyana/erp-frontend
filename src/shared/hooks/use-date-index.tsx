import { useMemo } from 'react'

type Params = {
	indexDate: number // tanggal ke berapa 1-31
	indexMonth: number // index 0-11
	year?: number
}
export function useDateIndex({ indexDate, indexMonth, year }: Params) {
	const resultDate = useMemo(() => {
		const tmpDate = Math.max(1, Math.min(indexDate, 31))
		const tmpMonth = Math.max(0, Math.min(indexMonth, 11))
		const tmpYear = year || new Date().getFullYear()

		return new Date(tmpYear, tmpMonth, tmpDate)
	}, [indexDate, indexMonth, year])

	return { resultDate }
}

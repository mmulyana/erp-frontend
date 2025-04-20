import { parseAsString, useQueryStates } from 'nuqs'

export const usePagination = () => {
	const [query] = useQueryStates({
		q: parseAsString.withDefault(''),
		page: parseAsString.withDefault('1'),
		limit: parseAsString.withDefault('10'),
	})
	const { q, page, limit } = query

	return {
		q,
		page,
		limit,
	}
}

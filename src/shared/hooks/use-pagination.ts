import { parseAsString, useQueryStates } from 'nuqs'

export const usePagination = () => {
	const [query] = useQueryStates({
		q: parseAsString.withDefault(''),
		page: parseAsString.withDefault('1'),
		limit: parseAsString.withDefault('10'),
		sort: parseAsString,
		status: parseAsString,
	})

	const status = query.status === '' ? undefined : query.status

	let sortBy: 'createdAt' | 'startDate' | 'endDate' | undefined
	let sortOrder: 'asc' | 'desc' | undefined

	if (query.sort) {
		const [by, order] = query.sort.split(':') as [
			typeof sortBy,
			typeof sortOrder
		]
		sortBy = by
		sortOrder = order
	}

	return {
		q: query.q,
		page: query.page,
		limit: query.limit,
		sortBy,
		sortOrder,
		status: status as string,
	}
}

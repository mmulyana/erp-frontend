import { useMemo } from 'react'

type Link = {
	name: string
	path: string
	icon?: React.ReactNode
	hideName?: boolean
}

interface BuildLinksOptions {
	baseLinks: Link[]
	replaceName?: string
	newLink?: Link
	condition?: boolean
}

export function useDynamicLinks({
	baseLinks,
	replaceName,
	newLink,
	condition,
}: BuildLinksOptions): Link[] {
	return useMemo(() => {
		if (!condition || !newLink) return baseLinks

		return [...baseLinks.filter((i) => i.name !== replaceName), newLink]
	}, [baseLinks, replaceName, newLink, condition])
}

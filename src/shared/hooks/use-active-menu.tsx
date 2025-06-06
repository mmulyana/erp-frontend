import { useLocation, matchPath } from 'react-router-dom'
import { useMemo } from 'react'

import { paths } from '@/shared/constants/paths'

export const useActiveMenu = () => {
	const { pathname } = useLocation()

	return useMemo(() => {
		const activeStates = {
			path: '',
		}

		Object.entries(paths).forEach(([_, value]) => {
			const match = matchPath(value, pathname)
			if (match) {
				activeStates.path = value
			}
		})

		if (!activeStates.path) {
			activeStates.path = pathname
		}

		return activeStates
	}, [pathname])
}

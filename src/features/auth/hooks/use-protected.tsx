import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAtom, useSetAtom } from 'jotai'

import { CookieKeys, CookieStorage } from '@/shared/utils/cookie'
import { permissionAtom } from '@/shared/store/permission'
import { useGetme } from '@/shared/api/use-get-me'
import { hasAnyPermission } from '@/shared/utils'
import { paths } from '@/shared/constants/paths'
import { userAtom } from '@/shared/store/auth'
import { routes } from '@/app'

export const delay = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms))

const useProtected = () => {
	const navigate = useNavigate()

	const setUser = useSetAtom(userAtom)
	const [permissions, setPermissions] = useAtom(permissionAtom)

	const [enabled, setEnabled] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const token = CookieStorage.get(CookieKeys.AuthToken)
		if (token) {
			setEnabled(true)
		} else {
			setEnabled(false)
			setLoading(false)
		}
	}, [])

	const { data: account } = useGetme({ enabled })

	useEffect(() => {
		if (account?.data) {
			setUser(account.data)
			setPermissions(account.data.permissions || [])
		}
	}, [account, setUser, setPermissions])

	useEffect(() => {
		const doRedirect = async () => {
			if (!enabled || permissions.length === 0) return

			await delay(500)

			const firstAllowedRoute = routes.find((route) => {
				if (route.withoutAuth) return false
				return hasAnyPermission(permissions, route.permission)
			})
			console.log('first', firstAllowedRoute)
			if (firstAllowedRoute) {
				navigate(firstAllowedRoute.path, { replace: true })
			} else {
				navigate(paths.accessDenied, { replace: true })
			}
			setLoading(false)
		}

		doRedirect()
	}, [enabled, permissions, navigate])

	return {
		loading,
	}
}

export default useProtected

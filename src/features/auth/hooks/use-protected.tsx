import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAtom, useSetAtom } from 'jotai'

import { CookieKeys, CookieStorage } from '@/shared/utils/cookie'
import { permissionAtom } from '@/shared/store/permission'
import { useGetme } from '@/shared/api/use-get-me'
import { delay, hasAnyPermission } from '@/shared/utils'
import { paths } from '@/shared/constants/paths'
import { userAtom } from '@/shared/store/auth'
import { routes } from '@/app'

const useProtected = () => {
	const navigate = useNavigate()
	const setUser = useSetAtom(userAtom)
	const [permissions, setPermission] = useAtom(permissionAtom)
	const [enabled, setEnabled] = useState(false)

	const { data: account, isLoading } = useGetme({ enabled })

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const token = CookieStorage.get(CookieKeys.AuthToken)
		if (!token) {
			setEnabled(false)
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		if (account?.data) {
			setPermission(account.data.permissions || [])
			setUser(account.data)
		}
	}, [account, setPermission, setUser])

	useEffect(() => {
		const token = CookieStorage.get(CookieKeys.AuthToken)

		async function checkPermissions() {
			if (!isLoading && token) {
				delay(500, () => {
					if (permissions.length > 0) {
						const firstAllowedRoute = routes.find((route) => {
							if (route.withoutAuth) return false
							return hasAnyPermission(permissions, route.permission)
						})

						if (firstAllowedRoute) {
							navigate(firstAllowedRoute.path, { replace: true })
						} else {
							navigate(paths.accessDenied, { replace: true })
						}
					}
					setLoading(false)
				})
			}
		}

		checkPermissions()
	}, [permissions, isLoading, navigate])

	return {
		loading,
	}
}

export default useProtected

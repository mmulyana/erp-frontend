import { useSetAtom, useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import { permissionAtom } from '@/shared/store/permission'
import { useGetme } from '@/shared/api/use-get-me'
import { userAtom } from '@/shared/store/auth'

import { CookieKeys, CookieStorage } from './cookie'
import { paths } from '../constants/paths'

type Props = {
	children: React.ReactNode
	requiredPermissions?: string[]
}

export default function ProtectedRoute({
	children,
	requiredPermissions = [],
}: Props) {
	const navigate = useNavigate()
	const setUserAtom = useSetAtom(userAtom)
	const setPermissionAtom = useSetAtom(permissionAtom)
	const userPermissions = useAtomValue(permissionAtom)

	const [id, setId] = useState<number | undefined>(undefined)

	const { data: account, isLoading } = useGetme()

	useEffect(() => {
		const token = CookieStorage.get(CookieKeys.AuthToken)
		if (!token) {
			navigate(paths.base, { replace: true })
			navigate(0)
		}
		const user: { id: number } = jwtDecode(token)
		setId(user.id)
		return () => {}
	}, [])

	useEffect(() => {
		if (account?.data) {
			setPermissionAtom(account?.data.permissions as string[])
			setUserAtom(account.data)
		}
	}, [account, isLoading, id])

	useEffect(() => {
		if (requiredPermissions.length > 0 && userPermissions.length > 0) {
			const hasPermission = requiredPermissions.every((permission) =>
				userPermissions.includes(permission)
			)

			if (!hasPermission) {
				navigate('/', { replace: true })
			}
		}
	}, [requiredPermissions, userPermissions])

	return <>{children}</>
}

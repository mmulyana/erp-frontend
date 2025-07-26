import { useNavigate } from 'react-router-dom'

import { CookieKeys, CookieStorage } from '@/shared/utils/cookie'
import { paths } from '@/shared/constants/paths'

export const checkAuth = () => {
	const navigate = useNavigate()
	const token = CookieStorage.get(CookieKeys.AuthToken)
	if (!token) {
		const currentPath = window.location.pathname
		if (currentPath !== paths.base) {
			sessionStorage.setItem(CookieKeys.RedirectAfterLogin, currentPath)
		}
		navigate(paths.base)
	}
	return !!token
}

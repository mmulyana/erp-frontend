import { PATH } from '@/shared/constants/paths'
import { CookieKeys, CookieStorage } from '@/shared/utils/cookie'
import { useNavigate } from 'react-router-dom'

export const checkAuth = () => {
	const navigate = useNavigate()
	const token = CookieStorage.get(CookieKeys.AuthToken)
	if (!token) {
		const currentPath = window.location.pathname
		if (currentPath !== PATH.BASE) {
			sessionStorage.setItem(CookieKeys.RedirectAfterLogin, currentPath)
		}
		navigate(PATH.BASE)
	}
	return !!token
}

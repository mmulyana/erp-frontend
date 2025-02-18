import { PATH } from '@/utils/constant/_paths'
import { CookieKeys, CookieStorage } from '@/utils/cookie'
import { useNavigate } from 'react-router-dom'

export const checkAuth = () => {
	const navigate = useNavigate()
	const token = CookieStorage.get(CookieKeys.AuthToken)
	if (!token) {
		const currentPath = window.location.pathname
		if (currentPath !== PATH.LOGIN) {
			sessionStorage.setItem('redirectAfterLogin', currentPath)
		}
		navigate(PATH.LOGIN)
	}
	return !!token
}

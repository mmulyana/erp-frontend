import { PATH } from '@/utils/constant/_paths'
import { CookieKeys, CookieStorage } from '@/utils/cookie'
import { useNavigate } from 'react-router-dom'

const logout = () => {
	const navigate = useNavigate()

	CookieStorage.remove(CookieKeys.AuthToken)
	sessionStorage.removeItem(CookieKeys.RedirectAfterLogin)

	navigate(PATH.BASE)
}

export default logout

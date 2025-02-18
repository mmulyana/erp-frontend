import { PATH } from '@/utils/constant/_paths'
import { CookieKeys, CookieStorage } from '@/utils/cookie'
import { useNavigate } from 'react-router-dom'

export const logOut = () => {
	const navigate = useNavigate()

	CookieStorage.remove(CookieKeys.AuthToken)
	sessionStorage.removeItem('redirectAfterLogin')
  
	navigate(PATH.LOGIN)
}

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { CookieKeys, CookieStorage } from '@/utils/cookie'
import { PATH } from '@/utils/constant/_paths'

const useProtected = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const token = CookieStorage.get(CookieKeys.AuthToken)
		if (token) {
			navigate(PATH.DASHBOARD_OVERVIEW, { replace: true })
			navigate(0)
		}
		return () => {}
	}, [])
}

export default useProtected

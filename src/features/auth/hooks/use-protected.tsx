import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { CookieKeys, CookieStorage } from '@/shared/utils/cookie'
import { paths } from '@/shared/constants/paths'

const useProtected = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const token = CookieStorage.get(CookieKeys.AuthToken)
		if (token) {
			navigate(paths.adminUser, { replace: true })
			navigate(0)
		}
		return () => {}
	}, [])
}

export default useProtected

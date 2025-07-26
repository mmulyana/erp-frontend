import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import usePermission from './use-permission'

const useProtectedRouter = ({
	required,
	pagesName,
}: {
	required: string[]
	pagesName?: string
}) => {
	const navigate = useNavigate()
	const location = useLocation()
	const permission = usePermission()

	useEffect(() => {
		const hasAccess = required.some((key) => permission.includes(key))
		if (!hasAccess) {
			navigate(`/access-denied?pagesName=${pagesName}`, {
				replace: true,
				state: { from: location },
			})
		}
	}, [required, permission, navigate, location])
}

export default useProtectedRouter

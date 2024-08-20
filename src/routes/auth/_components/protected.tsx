import { PATH } from '@/utils/constant/_paths'
import { CookieKeys, CookieStorage } from '@/utils/cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children }: React.PropsWithChildren) {
  const navigate = useNavigate()

  useEffect(() => {
    const token = CookieStorage.get(CookieKeys.AuthToken)
    if (token) {
      navigate(PATH.DASHBOARD_OVERVIEW, { replace: true })
      navigate(0)
    }
    return () => {}
  }, [])

  return children
}

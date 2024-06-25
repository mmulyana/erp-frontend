import { useEffect } from 'react'
import { CookieKeys, CookieStorage } from './cookie'
import { useNavigate } from 'react-router-dom'
import { PATH } from './constant/_paths'
import { jwtDecode } from 'jwt-decode'
import { User } from './types/user'
import { useSetAtom } from 'jotai'
import { userAtom } from '@/atom/auth'

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
  const navigate = useNavigate()
  const setUserAtom = useSetAtom(userAtom)

  useEffect(() => {
    const token = CookieStorage.get(CookieKeys.AuthToken)
    if (!token) {
      navigate(PATH.LOGIN, { replace: true })
      navigate(0)
    }
    const user: User = jwtDecode(token)
    setUserAtom(user)

    return () => {}
  }, [])

  return <>{children}</>
}

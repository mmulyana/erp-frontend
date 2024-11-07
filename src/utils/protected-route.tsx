import { useEffect, useState } from 'react'
import { CookieKeys, CookieStorage } from './cookie'
import { useNavigate } from 'react-router-dom'
import { PATH } from './constant/_paths'
import { jwtDecode } from 'jwt-decode'
import { User } from './types/user'
import { useSetAtom } from 'jotai'
import { userAtom } from '@/atom/auth'
// import { permissionAtom } from '@/atom/permission'

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
  const navigate = useNavigate()
  const setUserAtom = useSetAtom(userAtom)
  // const setPermissionAtom = useSetAtom(permissionAtom)

  const [_, setId] = useState<number | undefined>(undefined)

  useEffect(() => {
    const token = CookieStorage.get(CookieKeys.AuthToken)
    if (!token) {
      navigate(PATH.LOGIN, { replace: true })
      navigate(0)
    }
    const user: User = jwtDecode(token)
    setId(user.id)
    setUserAtom(user)
    return () => {}
  }, [])

  // useEffect(() => {
  //   if (!account) return
  //   setPermissionAtom(account?.permissions)
  // }, [account])

  return <>{children}</>
}

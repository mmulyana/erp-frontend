import { useEffect, useState } from 'react'
import { CookieKeys, CookieStorage } from './cookie'
import { useNavigate } from 'react-router-dom'
import { PATH } from './constant/_paths'
import { jwtDecode } from 'jwt-decode'
import { useSetAtom } from 'jotai'
import { userAtom } from '@/atom/auth'
import { useApiData } from '@/hooks/use-api-data'
import { useAccount } from '@/hooks/api/use-account'
import { permissionAtom } from '@/atom/permission'

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
  const navigate = useNavigate()
  const setUserAtom = useSetAtom(userAtom)
  const setPermissionAtom = useSetAtom(permissionAtom)

  const [id, setId] = useState<number | undefined>(undefined)

  const { data: account, isLoading } = useApiData(
    useAccount({ id, enabled: !!id })
  )

  useEffect(() => {
    const token = CookieStorage.get(CookieKeys.AuthToken)
    if (!token) {
      navigate(PATH.LOGIN, { replace: true })
      navigate(0)
    }
    const user: { id: number } = jwtDecode(token)
    setId(user.id)
    return () => {}
  }, [])

  console.log('account', account)

  useEffect(() => {
    if (account && !isLoading && !!id) {
      setPermissionAtom(account?.permissions)
      setUserAtom(account)
    }
  }, [account, isLoading, id])

  return <>{children}</>
}

import { PATH } from '@/utils/constant/_paths'
import { CookieKeys, CookieStorage } from '@/utils/cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className='absolute w-[480px] max-w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4'>
        <div className='p-4 py-6 border border-gray-300/90 rounded-2xl bg-gray-100 backdrop-blur-md shadow-2xl shadow-gray-800/10'>
          {children}
        </div>
      </div>
      <div className='absolute -z-10 w-full h-full bg-white'></div>
    </>
  )
}

export function Protected({ children }: React.PropsWithChildren) {
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

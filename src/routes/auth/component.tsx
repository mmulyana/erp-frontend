import { PATH } from '@/utils/constant/_paths'
import { CookieKeys, CookieStorage } from '@/utils/cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className='absolute w-[480px] max-w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4'>
        <div className='p-4 border border-gray-200 rounded-2xl bg-[#F7F7F8] shadow-xl shadow-gray-600/10'>
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

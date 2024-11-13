import { PATH } from '@/utils/constant/_paths'
import { URLS } from '@/utils/constant/_urls'
import { CookieKeys, CookieStorage } from '@/utils/cookie'
import fetchOptions from '@/utils/fetch-options'
import { useNavigate } from 'react-router-dom'

type LoginPayload = {
  name?: string
  email?: string
  password: string
}

export const useAuth = () => {
  const navigate = useNavigate()
  const logIn = async (payload: LoginPayload) => {
    try {
      const options = new fetchOptions('POST', JSON.stringify(payload))
      const res = await fetch(URLS.LOGIN, options.data)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message)
      }

      CookieStorage.set(CookieKeys.AuthToken, data.data.token)

      return data
    } catch (error: any) {
      return { message: error.message }
    }
  }

  const logOut = () => {
    CookieStorage.remove(CookieKeys.AuthToken)
    navigate(PATH.LOGIN)
  }

  return {
    logIn,
    logOut,
  }
}

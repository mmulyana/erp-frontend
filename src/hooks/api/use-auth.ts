import { PATH } from '@/utils/constant/_paths'
import { URLS } from '@/utils/constant/_urls'
import { CookieKeys, CookieStorage } from '@/utils/cookie'
import http from '@/utils/http'
import { ApiError } from '@/utils/types/api'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type LoginPayload = {
  name?: string
  email?: string
  password: string
}

export const useAuth = () => {
  const navigate = useNavigate()
  const logIn = async (payload: LoginPayload) => {
    try {
      const data = await http.post(URLS.LOGIN, payload)

      CookieStorage.set(CookieKeys.AuthToken, data.data.data.token)

      toast.success(`Selamat datang ${data.data.data.name}`)
      navigate(PATH.DASHBOARD_OVERVIEW)
    } catch (error: unknown) {
      const err = error as AxiosError<ApiError>
      toast.error(err.response?.data.message)
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

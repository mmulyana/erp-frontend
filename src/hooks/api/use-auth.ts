import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { CookieKeys, CookieStorage } from '@/utils/cookie'
import { PATH } from '@/utils/constant/_paths'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

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
      const err = error as AxiosError<any>

      if (err.response?.data?.errors?.phoneNumber) {
        return toast.error(err.response?.data?.errors?.phoneNumber.message)
      }
      if (err.response?.data?.errors?.name) {
        return toast.error(err.response?.data?.errors?.name.message)
      }
      if (err.response?.data?.errors?.email) {
        return toast.error(err.response?.data?.errors?.email.message)
      }

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

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

type LoginResponse = {
  data: {
    token: string
    name: string
  }
}

export const useAuth = () => {
  const navigate = useNavigate()

  const logIn = async (payload: LoginPayload) => {
    try {
      const { data } = await http.post<LoginResponse>(URLS.LOGIN, payload)
      const token = data.data.token

      const decodedToken: any = JSON.parse(atob(token.split('.')[1]))
      const expires = new Date(decodedToken.exp * 1000)
      CookieStorage.set(CookieKeys.AuthToken, token, { expires })

      toast.success(`Selamat datang ${data.data.name}`)

      const redirectPath = sessionStorage.getItem('redirectAfterLogin')
      if (redirectPath && redirectPath !== PATH.LOGIN) {
        sessionStorage.removeItem('redirectAfterLogin')
        navigate(redirectPath)
      } else {
        navigate(PATH.DASHBOARD_OVERVIEW)
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{
        message: string
        errors?: {
          phoneNumber?: { message: string }
          name?: { message: string }
          email?: { message: string }
        }
      }>

      if (err.response?.data?.errors?.phoneNumber) {
        toast.error(err.response.data.errors.phoneNumber.message)
        return
      }
      if (err.response?.data?.errors?.name) {
        toast.error(err.response.data.errors.name.message)
        return
      }
      if (err.response?.data?.errors?.email) {
        toast.error(err.response.data.errors.email.message)
        return
      }

      toast.error(err.response?.data?.message || 'Login failed')
    }
  }

  const logOut = () => {
    CookieStorage.remove(CookieKeys.AuthToken)
    sessionStorage.removeItem('redirectAfterLogin')
    navigate(PATH.LOGIN)
  }

  const checkAuth = () => {
    const token = CookieStorage.get(CookieKeys.AuthToken)
    if (!token) {
      const currentPath = window.location.pathname
      if (currentPath !== PATH.LOGIN) {
        sessionStorage.setItem('redirectAfterLogin', currentPath)
      }
      navigate(PATH.LOGIN)
    }
    return !!token
  }

  return {
    logIn,
    logOut,
    checkAuth,
  }
}
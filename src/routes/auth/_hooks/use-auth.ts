import { URLS } from '@/utils/constant/_urls'
import fetchOptions from '@/utils/fetch-options'

type LoginPayload = {
  name?: string
  email?: string
  password: string
}
export const useAuth = () => {
  const logIn = async (payload: LoginPayload) => {
    try {
      const options = new fetchOptions('POST', JSON.stringify(payload))
      const res = await fetch(URLS.LOGIN, options.data)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message)
      }

      return data
    } catch (error: any) {
      return { message: error.message }
    }
  }
  const register = async (payload: LoginPayload) => {
    try {
      const options = new fetchOptions('POST', JSON.stringify(payload))
      const res = await fetch(URLS.REGISTER, options.data)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message)
      }

      return data
    } catch (error: any) {
      return { message: error.message }
    }
  }

  return {
    logIn,
    register,
  }
}

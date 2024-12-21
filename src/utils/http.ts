import axios from 'axios'
import { CookieKeys, CookieStorage } from './cookie'
import { PATH } from './constant/_paths'

const http = axios.create({
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
})

http.interceptors.request.use(
  (config: any) => {
    const token = CookieStorage.get(CookieKeys.AuthToken)
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ''}`,
    }

    if (config.data && config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers['Content-Type'] = 'application/json'
    }

    return config
  },
  (error) => {
    if (error.response?.message.includes('Token expired') || error.response?.message.includes('Token invalid')) {
      CookieStorage.remove(CookieKeys.AuthToken)
      window.location.href = PATH.LOGIN
    }
    return Promise.reject(error)
  }
)

export default http

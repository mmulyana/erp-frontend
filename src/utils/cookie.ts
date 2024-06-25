import Cookies from 'universal-cookie'

export const CookieKeys = {
  AuthToken: 'authToken',
}

const cookies = new Cookies()

const CookieOptions: Record<string, string | boolean> = {
  path: '/',
  secure: true,
}

export const CookieStorage = {
  set: (
    key: string,
    data: string,
    options?: Record<string, string | number | boolean>
  ) => {
    return cookies.set(key, data, { ...CookieOptions, ...options })
  },
  get: (key: string, options?: Record<string, string | number | boolean>) => {
    return cookies.get(key, { ...CookieOptions, ...options })
  },
  remove: (key: string, options?: Record<string, string | number | boolean>) => {
    return cookies.remove(key, { ...CookieOptions, ...options })
  },
}

import Cookies, { CookieSetOptions, CookieGetOptions } from 'universal-cookie'

export const CookieKeys = {
	AuthToken: 'authToken',
	RedirectAfterLogin: 'redirectAfterLogin',
}

const cookies = new Cookies()

const defaultOptions: CookieSetOptions = {
	path: '/',
	// secure: true,
}

export const CookieStorage = {
	set: (key: string, data: string, options?: CookieSetOptions) => {
		return cookies.set(key, data, { ...defaultOptions, ...options })
	},
	get: (key: string, options?: CookieGetOptions) => {
		return cookies.get(key, options)
	},
	remove: (key: string, options?: CookieSetOptions) => {
		return cookies.remove(key, { ...defaultOptions, ...options })
	},
}

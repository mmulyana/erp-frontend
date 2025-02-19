import axios, { AxiosError } from 'axios'
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
		return Promise.reject(error)
	}
)

http.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		const statusCode = error.response?.status
		const responseData = error.response?.data as { message?: string }

		if (
			statusCode === 401 ||
			responseData?.message?.toLowerCase().includes('token expired') ||
			responseData?.message?.toLowerCase().includes('token invalid') ||
			responseData?.message?.toLowerCase().includes('invalid token')
		) {
			CookieStorage.remove(CookieKeys.AuthToken)

			const currentPath = window.location.pathname
			if (currentPath !== PATH.BASE) {
				sessionStorage.setItem(CookieKeys.RedirectAfterLogin, currentPath)
			}

			window.location.href = PATH.BASE
		}

		return Promise.reject(error)
	}
)

export default http

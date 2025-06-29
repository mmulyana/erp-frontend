import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { CookieKeys, CookieStorage } from '@/shared/utils/cookie'
import { paths } from '@/shared/constants/paths'
import { urls } from '@/shared/constants/urls'
import { ErrorResponse } from '@/shared/types'
import http from '@/shared/utils/http'

import { Payload, Response } from '../types'

export const useLogin = () => {
	const navigate = useNavigate()

	return useMutation({
		mutationFn: async (data: Payload) => {
			return http.post<Response>(urls.login, data)
		},
		onSuccess: (data) => {
			const token = data.data.data.token

			const decodedToken: any = JSON.parse(atob(token.split('.')[1]))
			const expires = new Date(decodedToken.exp * 1000)
			CookieStorage.set(CookieKeys.AuthToken, token, { expires })

			toast.success(`Selamat datang kembali`)

			const redirectPath = sessionStorage.getItem(CookieKeys.RedirectAfterLogin)
			if (redirectPath && redirectPath !== paths.base) {
				sessionStorage.removeItem(CookieKeys.RedirectAfterLogin)
				navigate(redirectPath)
			} else {
				navigate(paths.hris)
			}
		},
		onError: (error) => {
			const err = error as AxiosError<ErrorResponse<any>>
			toast.error(err.response?.data?.message || 'Login failed')
		},
	})
}

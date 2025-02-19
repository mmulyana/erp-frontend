import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { ErrorResponse } from '@/shared/types'

import { CookieKeys, CookieStorage } from '@/utils/cookie'
import { PATH } from '@/utils/constant/_paths'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

import { Payload, Response } from '../types'

export const useLogin = () => {
	const navigate = useNavigate()

	return useMutation({
		mutationFn: async (data: Payload) => {
			return http.post<Response>(URLS.LOGIN, data)
		},
		onSuccess: (data) => {
			const token = data.data.data.token

			const decodedToken: any = JSON.parse(atob(token.split('.')[1]))
			const expires = new Date(decodedToken.exp * 1000)
			CookieStorage.set(CookieKeys.AuthToken, token, { expires })

			toast.success(`Selamat datang kembali`)

			const redirectPath = sessionStorage.getItem(CookieKeys.RedirectAfterLogin)
			if (redirectPath && redirectPath !== PATH.BASE) {
				sessionStorage.removeItem(CookieKeys.RedirectAfterLogin)
				navigate(redirectPath)
			} else {
				navigate(PATH.ADMIN_USER)
			}
		},
		onError: (error) => {
			const err = error as AxiosError<ErrorResponse<any>>
			toast.error(err.response?.data?.message || 'Login failed')
		},
	})
}

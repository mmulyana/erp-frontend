import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'
import { CompanyForm } from '../types'
import { toFormData } from '@/shared/utils'

export const useCreateCompany = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: CompanyForm) => {
			const payload = toFormData(data)
			return await http.post(urls.companyClient, payload, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.companyClient] })
			queryClient.invalidateQueries({ queryKey: [keys.companyClientInfinite] })
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

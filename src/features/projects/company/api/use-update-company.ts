import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

import { CompanyForm } from '../types'
import { toFormData } from '@/shared/utils'

export const useUpdateCompany = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: CompanyForm & { id: string }) => {
			const payload = toFormData(data)

			const res = await http.patch(
				`${urls.companyClient}/${data.id}`,
				payload,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			return {
				res,
				id: data.id,
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.companyClient] })
			queryClient.invalidateQueries({ queryKey: [keys.companyClientInfinite] })
			queryClient.invalidateQueries({
				queryKey: [keys.companyClientDetail, data.id],
			})
			toast.success(data.res.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

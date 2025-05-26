import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import { StockIn } from '@/shared/types/api'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

import { CreateStockInPayload } from '../type'
import { toFormData } from '@/shared/utils'

export function useUpdateStockIn() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (
			payload: Partial<CreateStockInPayload> & { id: string }
		) => {
			const formData = toFormData(payload)

			return await http.patch<IApi<StockIn>>(
				`${urls.stockIn}/${payload.id}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.stockInDetail, data.data.data?.id],
			})
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

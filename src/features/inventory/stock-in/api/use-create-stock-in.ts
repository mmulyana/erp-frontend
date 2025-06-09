import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import { StockIn } from '@/shared/types/api'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

import { CreateStockInPayload } from '../type'

export function useCreateStockIn() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: CreateStockInPayload) => {
			const formData = new FormData()

			formData.append('referenceNumber', payload.referenceNumber ?? '')
			formData.append('supplierId', payload.supplierId ?? '')
			formData.append('note', payload.note ?? '')
			if (payload.date) {
				formData.append('date', new Date(payload.date).toISOString())
			}

			formData.append('items', JSON.stringify(payload.items))

			if (payload.photoUrl instanceof File) {
				formData.append('photoUrl', payload.photoUrl)
			}

			return await http.post<IApi<StockIn>>(urls.stockIn, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.stockIn] })
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			console.log(error)
			toast.error(error.response?.data.message)
		},
	})
}

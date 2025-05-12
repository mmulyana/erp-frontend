import { useMutation } from '@tanstack/react-query'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { CreateStockInPayload } from '../type'

export function useCreateStockIn() {
	return useMutation({
		mutationFn: async (payload: CreateStockInPayload) => {
			const formData = new FormData()

			formData.append('referenceNumber', payload.referenceNumber ?? '')
			formData.append('supplierId', payload.supplierId ?? '')
			formData.append('note', payload.note ?? '')
			formData.append('date', new Date(payload.date).toISOString())

			formData.append('items', JSON.stringify(payload.items))

			if (payload.photoUrl instanceof File) {
				formData.append('photoUrl', payload.photoUrl)
			}

			return await http.post(urls.stockIn, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		},
	})
}

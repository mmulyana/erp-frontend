import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

import { CreateStockOutPayload } from '../types'

export function useCreateStockOut() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: CreateStockOutPayload) => {
			const formData = new FormData()

			formData.append('note', payload.note ?? '')
			if (payload.date) {
				formData.append('date', new Date(payload.date).toISOString())
			}
			if (payload.projectId) {
				formData.append('projectId', payload.projectId)
			}
			formData.append('items', JSON.stringify(payload.items))

			if (payload.photoUrl instanceof File) {
				formData.append('photoUrl', payload.photoUrl)
			}

			return await http.post(urls.stockOut, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		},

		onSuccess: (res) => {
			queryClient.invalidateQueries({ queryKey: [keys.stockOut] })
			toast.success(res.data.message)
		},

		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message ?? 'Gagal membuat stock out')
		},
	})
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

import { CreateStockOutPayload } from '../types'
import { IApi } from '@/shared/types'
import { StockOut } from '@/shared/types/api'

export function useUpdateStockOut() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: CreateStockOutPayload & { id: string }) => {
			const formData = new FormData()

			formData.append('note', payload.note ?? '')
			formData.append('date', new Date(payload.date).toISOString())

			if (payload.projectId) formData.append('projectId', payload.projectId)

			if (payload.photoUrl instanceof File)
				formData.append('photoUrl', payload.photoUrl)

			return await http.patch<IApi<StockOut>>(
				`${urls.stockOut}/${payload.id}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
		},

		onSuccess: (res) => {
			queryClient.invalidateQueries({
				queryKey: [keys.stockOutDetail, res.data.data?.id],
			})
			toast.success(res.data.message)
		},

		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message ?? 'Gagal membuat stock out')
		},
	})
}

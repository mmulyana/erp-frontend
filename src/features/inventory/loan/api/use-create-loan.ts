import { useMutation } from '@tanstack/react-query'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { loanForm } from '../types'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export function useCreateLoan() {
	return useMutation({
		mutationFn: async (payload: loanForm) => {
			const formData = new FormData()

			if (payload.inventoryId)
				formData.append('inventoryId', payload.inventoryId)

			if (payload.requestQuantity)
				formData.append('requestQuantity', payload.requestQuantity.toString())

			if (payload.requestDate)
				formData.append(
					'requestDate',
					new Date(payload.requestDate).toISOString()
				)

			if (payload.note) formData.append('note', payload.note)
			if (payload.projectId) formData.append('projectId', payload.projectId)

			if (payload.photoUrlIn && payload.photoUrlIn instanceof File) {
				formData.append('photoUrl', payload.photoUrlIn)
			}

			return await http.post(urls.loan, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

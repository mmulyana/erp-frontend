import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

import http from '@/shared/utils/http'
import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import { toFormData } from '@/shared/utils'
import { IApi } from '@/shared/types'

import { SupplierForm } from '../types'
import { Supplier } from '@/shared/types/api'

export const useCreateSupplier = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (
			payload: SupplierForm
		): Promise<AxiosResponse<IApi<Supplier>>> => {
			const data = toFormData(payload)
			return await http.post(urls.supplier, data)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.supplier] })
			queryClient.invalidateQueries({ queryKey: [keys.supplierInfinite] })
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

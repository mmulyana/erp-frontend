import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'

import http from '@/shared/utils/http'
import { SupplierForm } from '../types'
import { toFormData } from '@/shared/utils'

export const useUpdateSupplier = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: SupplierForm & { id: string }) => {
			const data = toFormData(payload)
			const res = await http.patch(`${urls.supplier}/${payload.id}`, data)
			return {
				res,
				id: payload.id,
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.supplier] })
			queryClient.invalidateQueries({ queryKey: [keys.supplierInfinite] })
			queryClient.invalidateQueries({
				queryKey: [keys.supplierDetail, data.id],
			})
			toast.success(data.res.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

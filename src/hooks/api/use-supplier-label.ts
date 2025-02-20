import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/utils/http'
import { createLabel } from '@/utils/types/form'
import { toast } from 'sonner'
import { AxiosResponse } from 'axios'
import { IApi, SupplierLabel } from '@/utils/types/api'

type Params = Pagination & {
	name?: string
	tag?: string
}
export const useSupplierLabels = (params?: Params) => {
	return useQuery({
		queryFn: async (): Promise<AxiosResponse<IApi<SupplierLabel[]>>> => {
			return await http.request({
				method: 'GET',
				url: urls.inventorySupplierLabel,
				params,
			})
		},
		queryKey: [keys.supplierLabel, params],
	})
}
export const useDetailSupplierLabel = ({
	id,
	enabled,
}: {
	id?: number | null
	enabled?: boolean
}) => {
	return useQuery({
		queryFn: async (): Promise<AxiosResponse<IApi<SupplierLabel>>> => {
			return await http(`${urls.inventorySupplierLabel}/${id}`)
		},
		queryKey: [keys.supplierLabelDetail, id],
		enabled,
	})
}

export const useCreateSupplierLabel = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ payload }: { payload: createLabel }) => {
			return await http.post(urls.inventorySupplierLabel, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.supplierLabel] })
			toast.success(data.data.message)
		},
	})
}
export const useUpdateSupplierLabel = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			payload,
		}: {
			payload: createLabel & { id: number }
		}): Promise<AxiosResponse<IApi<{ id: number }>>> => {
			return await http.patch(`${urls.inventorySupplierLabel}/${payload.id}`, {
				name: payload.name,
				color: payload.color,
			})
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.supplierLabel] })
			queryClient.invalidateQueries({
				queryKey: [keys.supplierLabelDetail, data.data.data?.id],
			})
			toast.success(data.data.message)
		},
	})
}

export const useDeleteSupplierLabel = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			return await http.delete(urls.inventorySupplierLabel + '/' + id)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.supplierLabel] })
			toast.success(data.data.message)
		},
	})
}

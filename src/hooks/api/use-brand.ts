import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { GoodsBrand, IApi } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { createBrand } from '@/utils/types/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

type brandParams = Pagination & {
	name?: string
}
export const useBrand = (params?: brandParams) => {
	return useQuery({
		queryFn: async (): Promise<AxiosResponse<IApi<GoodsBrand[]>>> => {
			return await http(urls.inventoryBrand, {
				params,
			})
		},
		queryKey: [keys.brand, params],
	})
}

export const useDetailBrand = ({
	id,
	enabled,
}: {
	id?: number | null
	enabled?: boolean
}) => {
	return useQuery({
		queryFn: async (): Promise<AxiosResponse<IApi<GoodsBrand>>> => {
			return await http(`${urls.inventoryBrand}/${id}`)
		},
		queryKey: [keys.brandDetail, id],
		enabled,
	})
}

export const useCreateBrand = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ payload }: { payload: createBrand }) => {
			const formData = new FormData()
			formData.append('name', payload.name)
			if (payload.photo) {
				formData.append('photo', payload.photo)
			}

			return await http.post(urls.inventoryBrand, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.brand],
			})
			toast.success(data.data.message)
		},
	})
}

export const useUpdateBrand = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			payload,
		}: {
			payload: createBrand & {
				id: number
			}
		}): Promise<AxiosResponse<IApi<GoodsBrand>>> => {
			const formData = new FormData()
			formData.append('name', payload.name)
			if (payload.photo) {
				formData.append('photo', payload.photo)
			}

			return await http.patch(
				`${urls.inventoryBrand}/${payload.id}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.brand] })
			queryClient.invalidateQueries({
				queryKey: [keys.brandDetail, data.data.data?.id],
			})
			toast.success(data.data.message)
		},
	})
}

export const useDeleteBrand = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			return await http.delete(`${urls.inventoryBrand}/${id}`)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.brand] })
			toast.success(data.data.message)
		},
	})
}

import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { GoodsCategory, IApi } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

type Params = Pagination & {
	name?: string
}
export const useCategory = (params?: Params) => {
	return useQuery({
		queryFn: async (): Promise<AxiosResponse<IApi<GoodsCategory[]>>> => {
			return await http(urls.inventoryCategory, { params })
		},
		queryKey: [keys.category, params],
	})
}

export const useDetailCategory = ({
	id,
	enabled,
}: {
	id?: number | null
	enabled: boolean
}) => {
	return useQuery({
		queryFn: async (): Promise<AxiosResponse<IApi<GoodsCategory>>> => {
			return await http(`${urls.inventoryCategory}/${id}`)
		},
		queryKey: [keys.categoryDetail, id],
		enabled,
	})
}

export const useCreateCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			payload,
		}: {
			payload: {
				name: string
			}
		}) => {
			return await http.post(urls.inventoryCategory, payload)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [keys.category],
				refetchType: 'all',
				exact: false,
			})
		},
	})
}

export const useUpdateCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: number
			payload: {
				name: string
			}
		}): Promise<AxiosResponse<IApi<{ id: number }>>> => {
			return await http.patch(`${urls.inventoryCategory}/${id}`, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.category],
				refetchType: 'all',
				exact: false,
			})
			queryClient.invalidateQueries({
				queryKey: [keys.category, data.data.data?.id],
			})
		},
	})
}
export const useDeleteCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			return await http.delete(`${urls.inventoryCategory}/${id}`)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [keys.category],
				refetchType: 'all',
				exact: false,
			})
		},
	})
}

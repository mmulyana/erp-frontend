import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { GoodsLocation, IApi } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

type Params = Pagination & {
	name?: string
}
export const useLocation = (params?: Params) => {
	return useQuery({
		queryFn: async (): Promise<AxiosResponse<IApi<GoodsLocation[]>>> => {
			return await http(urls.inventoryLocation, {
				params,
			})
		},
		queryKey: [keys.location, params],
	})
}
export const useDetailLocation = ({
	id,
	enabled,
}: {
	id?: number | null
	enabled?: boolean
}) => {
	return useQuery({
		queryFn: async (): Promise<AxiosResponse<IApi<GoodsLocation>>> => {
			return await http(`${urls.inventoryLocation}/${id}`)
		},
		queryKey: [keys.locationDetail, id],
		enabled,
	})
}

export const useCreateLocation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			payload,
		}: {
			payload: {
				name: string
			}
		}) => {
			return await http.post(urls.inventoryLocation, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.location],
			})
			toast.success(data.data.message)
		},
	})
}
export const useUpdateLocation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			payload,
		}: {
			payload: {
				name: string
				id: number
			}
		}): Promise<AxiosResponse<IApi<GoodsLocation>>> => {
			return await http.patch(`${urls.inventoryLocation}/${payload.id}`, {
				name: payload.name,
			})
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.location] })
			queryClient.invalidateQueries({
				queryKey: [keys.locationDetail, data.data.data?.id],
			})
			toast.success(data.data.message)
		},
	})
}
export const useDeleteLocation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			return await http.delete(`${urls.inventoryLocation}/${id}`)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.location] })
			toast.success(data.data.message)
		},
	})
}

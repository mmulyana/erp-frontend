import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { keys } from '@/shared/constants/_keys'
import { urls } from '@/shared/constants/_urls'
import { IApi } from '@/utils/types/api'
import http from '@/shared/utils/http'

export const useAddPermissionRole = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({
			roleId,
			permissionId,
		}: {
			roleId: string
			permissionId: string
		}): Promise<AxiosResponse<IApi<{ roleId: string }>>> => {
			return await http.post(`${urls.role}/${roleId}/permission`, {
				permissionId,
			})
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.rolesDetail, data.data.data?.roleId],
			})
		},
	})
}

export const useRemovePermissionRole = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({
			roleId,
			permissionId,
		}: {
			roleId: string
			permissionId: string
		}): Promise<AxiosResponse<IApi<{ roleId: string }>>> => {
			return await http.delete(
				`${urls.role}/${roleId}/permission/${permissionId}`
			)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.rolesDetail, data.data.data?.roleId],
			})
		},
	})
}

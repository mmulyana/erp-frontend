import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { IApi } from '@/utils/types/api'
import http from '@/utils/http'

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
			return await http.post(`${URLS.ROLE}/${roleId}/permission`, {
				permissionId,
			})
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [KEYS.ROLES_DETAIL, data.data.data?.roleId],
			})
		},
	})
}

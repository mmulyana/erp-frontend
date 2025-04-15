import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { keys } from '@/shared/constants/_keys'
import { urls } from '@/shared/constants/_urls'
import { IApi } from '@/utils/types/api'
import http from '@/shared/utils/http'

import { PermissionGroup } from '../type'

export const usePermissionGroup = ({ enabled }: { enabled?: boolean }) => {
	return useQuery({
		queryKey: [keys.permissionGroup],
		queryFn: async (): Promise<AxiosResponse<IApi<PermissionGroup[]>>> => {
			return await http(urls.permission + '/group')
		},
		enabled,
	})
}

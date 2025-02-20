import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IApi } from '@/utils/types/api'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { PermissionGroup } from '../type'

export const usePermissionGroup = ({ enabled }: { enabled?: boolean }) => {
	return useQuery({
		queryKey: [KEYS.PERMISSION_GROUP],
		queryFn: async (): Promise<AxiosResponse<IApi<PermissionGroup[]>>> => {
			return await http(URLS.PERMISSION + '/group')
		},
		enabled,
	})
}

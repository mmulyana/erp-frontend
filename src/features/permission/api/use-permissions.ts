import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

export const usePermissions = () => {
	return useQuery({
		queryKey: [keys.permission],
		queryFn: async (): Promise<IApi<any[]>> => {
			const { data } = await http(`${urls.permission}`)
			return data
		},
	})
}

import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'
import { Company } from '../types'

type Params = {
	id?: string
}

export const useCompany = (params?: Params) => {
	return useQuery({
		queryKey: [keys.companyClientDetail, params?.id],
		queryFn: async (): Promise<IApi<Company>> => {
			const { data } = await http(`${urls.companyClient}/${params?.id}`, {
				params,
			})
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

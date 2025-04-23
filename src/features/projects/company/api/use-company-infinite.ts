import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { IApiInfinite } from '@/shared/types'
import http from '@/shared/utils/http'

import { Company } from '../types'

type Params = {
	search?: string
	page?: string
	limit?: string
}

export const useCompanyInfinite = (params?: Params) => {
	return useQuery({
		queryKey: [keys.companyClientInfinite, params],
		queryFn: async (): Promise<IApiInfinite<Company[]>> => {
			const { data } = await http(urls.companyClient + 'data/infinite', {
				params,
			})
			return data
		},
	})
}

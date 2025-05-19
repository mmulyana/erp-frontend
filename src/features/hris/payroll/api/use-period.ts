import { useQuery } from '@tanstack/react-query'

import { PayrollPeriod } from '@/shared/types/api'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'

type Params = {
	id?: string
}

export const usePeriod = (params?: Params) => {
	return useQuery({
		queryKey: [keys.payrollPeriodDetail, params],
		queryFn: async (): Promise<IApi<PayrollPeriod>> => {
			const { data } = await http(`${urls.payrollPeriod}/${params?.id}`, {
				params,
			})
			return data
		},
	})
}

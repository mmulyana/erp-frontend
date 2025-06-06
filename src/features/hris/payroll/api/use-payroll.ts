import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Payroll } from '@/shared/types/api'
import http from '@/shared/utils/http'

type Params = {
	id?: string
}

export const usePayroll = (params?: Params) => {
	return useQuery({
		queryKey: [keys.payrollDetail, params?.id],
		queryFn: async (): Promise<Payroll> => {
			const { data } = await http(`${urls.payroll}/${params?.id}`)
			return data.data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params.id !== '',
	})
}

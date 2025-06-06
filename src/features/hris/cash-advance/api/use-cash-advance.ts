import { useQuery } from '@tanstack/react-query'

import { IApi } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { CashAdvance } from '../types'

export const useCashAdvance = ({ id }: { id?: string }) => {
	return useQuery({
		queryKey: [keys.cashAdvancesDetail, id],
		queryFn: async (): Promise<IApi<CashAdvance>> => {
			const { data } = await http(`${urls.cashAdvances}/${id}`)
			return data
		},
		enabled: id !== undefined && id !== null && id !== '',
	})
}

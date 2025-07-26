import { useQuery } from '@tanstack/react-query'

import { Attendance, CashAdvance, Overtime } from '@/shared/types/api'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type cashAdvanceWithRemaining = CashAdvance & {
	remaining: number
}

type params = {
	id?: string
	startDate?: string
	endDate?: string
}
export const useSummaryEmployee = (params?: params) => {
	return useQuery({
		queryKey: [keys.employeeSummary, params],
		queryFn: async (): Promise<{
			total: {
				presence: number
				absent: number
				overtimes: number
			}
			overtimes: Overtime[]
			cashAdvances: cashAdvanceWithRemaining[]
			attendances: Attendance[]
		}> => {
			const { data } = await http(`${urls.employee}/${params?.id}/summary`, {
				params,
			})
			return data.data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

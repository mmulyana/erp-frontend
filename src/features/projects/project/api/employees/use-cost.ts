import { useQuery } from '@tanstack/react-query'
import { Employee, IApi } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type Params = {
	projectId?: string
}

export const useCost = (params?: Params) => {
	return useQuery({
		queryKey: [keys.projectEmployeeCost, params?.projectId],
		queryFn: async (): Promise<
			IApi<{
				data: {
					id: string
					startDate: string
					endDate: string | null
					employee: Employee
					days: number
					cost: number
				}[]
				totalCost: number
			}>
		> => {
			const { data } = await http(
				`${urls.project}/data/assigned/cost/${params?.projectId}`
			)
			return data
		},
		enabled: !!params?.projectId,
	})
}

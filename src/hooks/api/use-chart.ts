import { useQuery } from '@tanstack/react-query'
import { Chart, IApi, TopClientChart } from '@/utils/types/api'
import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import { AxiosResponse } from 'axios'
import http from '@/utils/http'

export const useChartEmployeeByPosition = () => {
	return useQuery({
		queryKey: [keys.employeeTotal],
		queryFn: async (): Promise<AxiosResponse<IApi<Chart>>> => {
			return http(urls.hrisPosition + '/data/employee-by-position')
		},
	})
}
export const useChartEmployeeByStatus = () => {
	return useQuery({
		queryKey: [keys.employeeStatus],
		queryFn: async (): Promise<AxiosResponse<IApi<Chart>>> => {
			return http(urls.hrisPosition + '/data/employee-by-status')
		},
	})
}
export const useChartCashAdvance = (params?: { total: number }) => {
	return useQuery({
		queryKey: [keys.cashAdvancesChart],
		queryFn: async (): Promise<AxiosResponse<IApi<Chart>>> => {
			return http(urls.cashAdvances + '/data/total-by-month', { params })
		},
	})
}
export const useChartTopClient = () => {
	return useQuery({
		queryKey: [keys.topClient],
		queryFn: async (): Promise<AxiosResponse<IApi<TopClientChart>>> => {
			return http(urls.projectClient + '/data/top-client')
		},
	})
}
export const useChartProject = () => {
	return useQuery({
		queryKey: [keys.projectChart],
		queryFn: async (): Promise<
			AxiosResponse<
				IApi<{
					chartData: {
						[key: string]: number
					}[]
					chartConfig: {
						[key: string]: {
							label: string
							color: string
						}
					}
				}>
			>
		> => {
			return http(urls.kanbanBoard + '/data/chart')
		},
	})
}

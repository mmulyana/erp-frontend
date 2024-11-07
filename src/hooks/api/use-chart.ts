import { useQuery } from '@tanstack/react-query'
import { Chart, IApi, TopClientChart } from '@/utils/types/api'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { AxiosResponse } from 'axios'
import http from '@/utils/http'

export const useChartEmployeeByPosition = () => {
  return useQuery({
    queryKey: [KEYS.EMPLOYEE_TOTAL],
    queryFn: async (): Promise<AxiosResponse<IApi<Chart>>> => {
      return http(URLS.HRIS_POSITION + '/data/employee-by-position')
    },
  })
}
export const useChartEmployeeByStatus = () => {
  return useQuery({
    queryKey: [KEYS.EMPLOYEE_STATUS],
    queryFn: async (): Promise<AxiosResponse<IApi<Chart>>> => {
      return http(URLS.HRIS_POSITION + '/data/employee-by-status')
    },
  })
}
export const useChartCashAdvance = (params?: { total: number }) => {
  return useQuery({
    queryKey: [KEYS.CASH_ADVANCES_CHART],
    queryFn: async (): Promise<AxiosResponse<IApi<Chart>>> => {
      return http(URLS.CASH_ADVANCES + '/data/total-by-month', { params })
    },
  })
}
export const useChartTopClient = () => {
  return useQuery({
    queryKey: [KEYS.TOP_CLIENT],
    queryFn: async (): Promise<AxiosResponse<IApi<TopClientChart>>> => {
      return http(URLS.PROJECT_CLIENT + '/data/top-client')
    },
  })
}
export const useChartProject = () => {
  return useQuery({
    queryKey: [KEYS.PROJECT_CHART],
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
      return http(URLS.KANBAN_BOARDD + '/data/chart')
    },
  })
}

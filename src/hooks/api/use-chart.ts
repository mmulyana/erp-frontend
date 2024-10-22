import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Chart, IApi } from '@/utils/types/api'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

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

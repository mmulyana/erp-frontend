import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { useQuery } from '@tanstack/react-query'

type ParamsEmployee = {
  search?: string
  positionId?: string
}
export const useEmployees = (params: ParamsEmployee) => {
  return useQuery({
    queryKey: [KEYS.EMPLOYEE, params],
    queryFn: async () => {
      return await http
        .request({
          method: 'GET',
          url: URLS.EMPLOYEE,
          params,
        })
        .then((res) => res.data)
        .catch((err) => {
          throw err
        })
    },
    enabled: !!params.positionId,
  })
}

export const useEmployee = (id?: number) => {
  return useQuery({
    queryKey: [KEYS.EMPLOYEE, id],
    queryFn: async () => {
      return await http(`${URLS.EMPLOYEE}/${id}`)
    },
    enabled: !!id,
  })
}

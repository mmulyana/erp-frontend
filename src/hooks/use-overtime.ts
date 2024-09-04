import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type OvertimesParams = Pagination & {
  name?: string
}
export const useOvertime = (params: OvertimesParams) => {
  return useQuery({
    queryKey: [KEYS.OVERTIME, params],
    queryFn: async () => {
      return await http.request({
        method: 'GET',
        url: URLS.OVERTIME,
        params,
      })
    },
  })
}

type createOvertime = {
  employeeId: number
  date: string | Date
  total_hour: number
  description?: string
}
export const useCreateOvertime = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: createOvertime) => {
      return await http.post(URLS.OVERTIME, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.OVERTIME] })
    },
  })
}

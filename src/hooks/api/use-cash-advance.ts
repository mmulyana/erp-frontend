import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type ParamsLeaves = Pagination & {
  name?: string
  date?: string
}
export const useCashAdvance = (params: ParamsLeaves) => {
  return useQuery({
    queryKey: [KEYS.CASH_ADVANCES, params],
    queryFn: async () => {
      return await http.request({
        method: 'GET',
        url: URLS.CASH_ADVANCES,
        params,
      })
    },
  })
}

export const useCreateCashAdvance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      return await http.post(URLS.CASH_ADVANCES, data)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.CASH_ADVANCES] })
      toast.success(data.data.message)
    },
  })
}

export const useDeleteCashAdvances = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(`${URLS.CASH_ADVANCES}/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CASH_ADVANCES],
      })
      toast.success(data?.data?.message)
    },
  })
}

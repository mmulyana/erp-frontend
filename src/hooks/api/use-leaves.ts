import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Pagination } from '@/utils/types/common'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { toast } from 'sonner'

type ParamsLeaves = Pagination & {
  name?: string
  date?: string
}
export const useLeaves = (params: ParamsLeaves) => {
  return useQuery({
    queryKey: [KEYS.LEAVES, params],
    queryFn: async () => {
      return await http.request({
        method: 'GET',
        url: URLS.LEAVES,
        params,
      })
    },
  })
}

export const useCreateLeaves = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      return await http.post(URLS.LEAVES, data)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.LEAVES] })
      toast.success(data.data.message)
    },
  })
}
